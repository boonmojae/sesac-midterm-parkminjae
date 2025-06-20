const express = require("express");
const router = express.Router();
const { signUpValidator, loginValidator, handleValidationResult } = require("../middlewares/validation-result-handler");
const authController = require("../controllers/auth.controller");

//회원가입
router.post("/sign-up", signUpValidator, handleValidationResult, authController.signUp);


//로그인
router.post("/login", loginValidator, handleValidationResult, authController.logIn);


module.exports = router;