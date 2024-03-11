const knex = require ("../database/knex")
const AppError = require("../utils/AppError");

async function checkIsAdmin(request, response, next) {
    const { id } = request.user;
    
    const user = await knex("users").where({ id }).first();
    console.log(user)

    if (!user.is_admin) {
        throw new AppError("Acesso negado", 403);
    }

    return next();
}

module.exports = checkIsAdmin;