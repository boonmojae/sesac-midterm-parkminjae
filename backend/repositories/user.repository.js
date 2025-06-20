const prisma = require("../utils/prisma");

class AuthRepository {

		//auth
    async findByEmail(email) {
        return await prisma.users.findUnique({
            where: { email }
        });
    }

    async createUser(email, password, username) {
        return await prisma.users.create({
            data: {
                email,
                password,
                username
            }
        });
    }
    
}

module.exports = new AuthRepository();