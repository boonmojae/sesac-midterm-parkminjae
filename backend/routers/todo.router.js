const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticate-middleware.js");
const { todoValidator, getTodoValidator, handleValidationResult } = require("../middlewares/validation-result-handler");
const todoController = require("../controllers/todo.controller");


//할일 목록 생성
router.post("/", todoValidator, handleValidationResult, authenticateToken, todoController.createTodo);

//전체 목록 
router.get("/", todoController.getTodos);

module.exports = router;