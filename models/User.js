const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const salfRounds = 10;  // 암호화를 위한 salt가 몇자리인지 10이면 10자리 salt가 생성된다.


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// pre() 또한 mongoose의 메소드이다. pre('save')를 통해 save() 메소드가 호출되기 전
// save()에서 진행될 작업을 가로챈 것이기 때문에 next() 메소드를 통해 save() 메소드로 다시 돌려주어야 한다.
userSchema.pre('save', function(next) {
    var user = this // 이게 왜 되는거지??
    /*
     해당 password가 기존 것과 바뀌었다는 것은 어떻게 알 수 있을까?
     DB에 저장된 password는 이미 암호화된 상태이다. 해당 패스워드와 동일함을 확인하기 위해선
     새로 들어온 패스워드도 결국 암호화 과정을 거쳐야 하는데 그런 과정을 거치지 않을 수 있는건가???...
    */
    if (user.isModified('password')) {
        console.log('암호화 진행할 것 ㅋ')
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(salfRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                // 암호화에 성공하였으므로 비밀번호를 저장한다.
                user.password = hash
                next()
            })
        })
    }
    else {
        console.log('수정되지 않았으니 암호화를 진행하지 않습니다!')
        next()
    }
})


const User = mongoose.model('User', userSchema)
module.exports = { User }