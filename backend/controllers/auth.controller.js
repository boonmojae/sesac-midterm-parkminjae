const authService = require("../services/auth.service");

class AuthController {

    //회원가입
    async signUp(req, res, next) {
        try {
            const { email, password, username } = req.body;

            const newUser = await authService.signUp(email, password, username);

            return res.status(201).json({
                message: "회원가입 성공",
                newUser
            })

        } catch(e) {
            next(e);
        }
    }


    //로그인
    async logIn(req, res, next) {
        try {
            const { email, password } = req.body;

            const token = await authService.logIn(email, password);

            return res.json({
                message: "로그인 성공",
                token
            })

        } catch(e) {
            next(e);
        }

    }

}

module.exports = new AuthController();