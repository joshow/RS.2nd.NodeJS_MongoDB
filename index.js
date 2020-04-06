// npm install express 4.17.1 --save
// npm instal mongoose 5.9.7 --save
// npm install body-parser --save
// npm install bcrypt --save
// nodemon 은 쓰지 않을꺼임... 귀찮음... 사용하고 싶다면 npm install nodemon --save-dev

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true})); // urlendcoded 양식의 정보를 분석할 수 있도록 한다.
app.use(bodyParser.json());  // json 파일을 분석할 수 있도록 한다. 

const mongoose = require('mongoose')
// 9강에서 devlopement아 release일 때 분기해주는데 나는 dev 그대로 가기로함. 중간에 바꿔야하면 9강 볼 것
const config = require('./config/dev')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))


app.get('/', (req, res) => res.send('HelloWord! Welcome to Node js~'))

// 여기서 /register 가 end point라고 하는데 그게 뭐지? url 맨 마지막에 붙는건가??
app.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 클라이언트에서 가져오면 그들을 DB에 넣어준다.

    // body-parser를 통해 req.body에서 전송받은 데이터를 사용할 수 있다.
    const user = new User(req.body)

    // Mongo DB 에 저장하는 메소드 save
    user.save((err, userInfo) => {
      if (err) {
        return res.json({ success: true, err })
      }
      return res.status(200).json({
        success: true
      })
    }) 
})

app.listen(port, () => console.log(`Example app listening port ${port}!`)) 

// Route가 뭐지??