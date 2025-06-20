const prisma = require("../utils/prisma");

class TodoRepository {


  //생성
 

async createTodo(title, description, userId) {
    if (!userId) {
        throw new Error('userId is required');
    }
    
    return await prisma.todos.create({
        data: {
            title,
            description,
            userId
        }
    });
}


  //모든 글 조회
  async getAllTodos() {
    return await prisma.todos.findMany({
      include: {
        User: {
          select: {
            userId: true,
            username: true
          }
        }
      }, orderBy: {
        createdAt: 'desc'
      }
    });
  }


  //특정 글 조회
  // async findByPostId(todoId) {
  //     return await prisma.post.findUnique({
  //         where: { todoId },
  //         include: {
  //             User: {
  //                 select: {
  //                     userId: true,
  //                     username: true
  //                 }
  //             }
  //         }
  //     });
  // }



}

module.exports = new TodoRepository();