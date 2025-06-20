const todoService = require("../services/todo.service");

class TodoController {

  //전체 글 조회
  async getTodos(req, res, next) {
    try {

      const todos = await todoService.getTodos();

      return res.json({
        data: todos
      })

    } catch (e) {
      next(e);
    }
  }



  //글 생성
  async createTodo(req, res, next) {
    try {
      const { title, description } = req.body;
      const userId = req.user;
      
      console.log(userId);
      const newTodo = await todoService.todoCreate(title, description, userId);

      return res.json({
        message: "할일 생성 완료",
        data: newTodo
      })
    } catch (e) {
      next(e);
    }
  }



  //특정 글 조회
  // async getPost(req, res, next) {
  //     try {

  //         const postId = +req.params.postId;

  //         const post = await postService.getPost(postId);

  //         return res.json({
  //             post: post
  //         })

  //     } catch (e) {
  //         next(e);
  //     }
  // }


}
module.exports = new TodoController();