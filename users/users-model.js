const db = require("../database/data")

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username", "phoneNumber")
}


function findBy(filter) {
    return db("users")
        .select("id", "username", "password", "phoneNumber")
        .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "username", "phoneNumber")
        .where({ id })
        .first()
}
async function update(id, updated) {

    await db("users")
        .where({ id })
        .update(updated)
}
// not needed
// function remove(id) {
//     if (!id) {
//         return null
//     }
//     return db("users")
//         .where("id", id)
//         .del()
// }


module.exports = {
    add,
    find,
    findBy,
    findById,
    update
    // remove,
}
