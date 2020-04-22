// npm install express 4.17.1 --save
// npm instal mongoose 5.9.7 --save
// npm install body-parser --save       // express.js 제공
// npm install cookie-parser --save      // express.js 제공
// npm install bcrypt --save
// nodemon 은 쓰지 않을꺼임... 귀찮음... 사용하고 싶다면 npm install nodemon --save-dev
// npm install jsonwebtoekn --save

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

app.use(bodyParser.urlencoded({extended: true})); // urlendcoded 양식의 정보를 분석할 수 있도록 한다.
app.use(bodyParser.json());  // json 파일을 분석할 수 있도록 한다. 
app.use(cookieParser());

const mongoose = require('mongoose')
// 9강에서 devlopement아 release일 때 분기해주는데 나는 dev 그대로 가기로함. 중간에 바꿔야하면 9강 볼 것
const config = require('./config/dev')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))


app.get('/', (req, res) => res.send('HelloWord! Welcome to Node js~'))

// 여기서 /register 가 end point라고 하는데 그게 뭐지? url 맨 마지막에 붙는건가??
app.post('/api/users/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 클라이언트에서 가져오면 그들을 DB에 넣어준다.

    // body-parser를 통해 req.body에서 전송받은 데이터를 사용할 수 있다.
    const user = new User(req.body)

    // Mongo DB 에 저장하는 메소드 save
    user.save((err, userInfo) => {
        if (err) {
          return res.json({ success: true, err })
        }
        return res.status(200).json({ success: true })
    }) 
})

app.post('/api/users/login', (req, res) => {
    // 데이터베이스에서 요청된 E-mail 계정 찾기
    User.findOne( { email: req.body.email }, (err, userInfo) => {  // mongdoDB 메소드
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "해당 이메일의 계정이 존재하지 않습니다."
            })
        }

        // E-mail이 동일하다면 password 또한 동일한지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            // if (err) return res.json({ loginSuccess: false, err })
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })
            }
          
            userInfo.generateToken((err, userInfo) => {
                if (err) return res.status(400).send(err)

                res.cookie("x_auth", userInfo.token)
                .status(200)
                .json({ 
                    loginSuccess: true,
                    userID: userInfo._id
                })
                
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id}, { token: '' },
        (err, user) =>{
            if (err) return res.json({ success: false, err })
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => console.log(`Example app listening port ${port}!`)) 

// Route가 뭐지??