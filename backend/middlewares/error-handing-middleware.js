module.exports = function (err, req, res, next) {
  switch (err.message) {

    case "InputValidation":
    case "PasswordValidation":
      return res.status(400).send({
        errorMessage: "잘못된 입력"
      })

    case "ExistEmail": return res.status(409).send({
      errorMessage: "가입된 이메일 존재"
    })

    case "Forbidden": return res.status(403).send({
      errorMessage: "접근 권한이 없습니다"
    })

    case "Password": return res.status(400).send({
      errorMessage: "패스워드 불일치"
    })

    case "UserNotFound": return res.status(404).send({
      errorMessage: "해당 유저가 없습니다"
    })
    case "PostNotFound": return res.status(404).send({
      errorMessage: "해당 게시글이 없습니다"
    })
    case "Need login":
    case "TokenNotMatched":
      return res.status(401).send({
        errorMessage: "로그인을 해주세요"
      });

    default : 
      return res.status(500).send({
      errorMessage: "서버 오류"
    })

  }
}