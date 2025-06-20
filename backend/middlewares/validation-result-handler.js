const { body, param, validationResult } = require("express-validator");

exports.signUpValidator = [
    body('email')
    .notEmpty().withMessage("이메일을 작성해주세요")
    .isEmail().withMessage("이메일 형식으로 작성해주세요."),
    body('password')
    .notEmpty().withMessage("비밀번호를 작성해주세요.")
    .isLength({ min: 6 }).withMessage("비밀번호 최소 6자"),
    body('username')
    .notEmpty().withMessage("닉네임을 작성해주세요.")
];

exports.loginValidator = [
    body('email')
    .notEmpty().withMessage("이메일을 작성해주세요.")
    .isEmail().withMessage("이메일 형식으로 작성해주세요."),
    body('password')
    .notEmpty().withMessage('비밀번호가 없습니다.')
];

exports.getUserValidator = [
    param('userId')
    .isInt().withMessage("userId를 숫자로 입력해주세요.")
];


exports.todoValidator = [
    body('title')
    .notEmpty().withMessage("제목을 작성해주세요."),
    body('description')
    .notEmpty().withMessage('내용을 작성해주세요.')
];

exports.getTodoValidator = [
    param('todoId')
    .isInt().withMessage("todoId를 숫자로 입력해주세요.")
];


exports.handleValidationResult = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
         const extractedError = result.array().map(error => error.msg);
         return res.status(400).json({
            errorMessage: extractedError[0]
            //0은 첫번째로 발견된 에러
         });
    }
    next();
};