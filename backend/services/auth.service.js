require("dotenv").config();
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
    
    //회원가입
    async signUp(email, password, username) {

        //입력받은 이메일 유무
        const existUser = await userRepository.findByEmail(email);

        if (existUser) {
            throw new Error("ExistEmail");
        }

        //비밀번호
        const saltRounds = +process.env.SALT_ROUNDS || 10;
        const salt = await bcrypt.genSalt(saltRounds);

        //비밀번호 저장하기 전에 암호화
        const bcryptPassword = await bcrypt.hash(
            password,
            salt
        );

        const newUser = await userRepository.createUser(email, bcryptPassword, username);

        //비밀번호 - 비밀번호 제외 값 - 전체값
        //password 변수명이 겹쳐서 : _ => password 변수는 사용X
        const { password: _, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }

    
    //로그인(토큰발급)
    async logIn(email, password) {

        //이메일 유무
        const existUser = await userRepository.findByEmail(email);

        //이메일X
        if (!existUser) {
            throw new Error("UserNotFound");
        }

        //이메일O 비밀번호X
        const verifyPassword = await bcrypt.compare(password, existUser.password);
        if (!verifyPassword) {
            throw new Error("Password");
        }

        //이메일O 비밀번호O
        const token = jwt.sign({
            userId: existUser.userId
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN || "12h"
        });

        return token;
    }
}

module.exports = new AuthService();