const todoRepository = require("../repositories/todo.repository");


class TodoService {

    //전체 글 조회
    async getTodos() {
        const todos = await todoRepository.getAllTodos();

        return todos;
    }

   

    //글 생성
    async todoCreate(title, description, userId) {
        const newTodo = await todoRepository.createTodo(title, description, userId);
        console.log(newTodo);

        return newTodo;
    }

     //특정 글 조회
    // async getPost(postId) {

    //     const post = await postRepository.findByPostId(postId);

    //     if (!post) {
    //         throw new Error("PostNotFound");
    //     }

    //     return post;
    // }

    

}

module.exports = new TodoService();