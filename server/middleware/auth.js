const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 부분
    
    let token = req.cookies.x_auth  // 쿠킥에서 토큰 가져온다.
    // 토큰 복호화 하기
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, err: true });

        req.token = token;
        req.user = user;
        
        next(); // 인증을 마쳤으면 돌아감
    })
}

module.exports = { auth }