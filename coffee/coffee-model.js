const db = require("../database/data")

function find(id) {
    return db("coffee")
        .join(
            "users",
            "users.id",
            "coffee.user_id",
        )
        .select(
            "coffee.id",
            "coffee.user_id",
            "coffee.origin",
            "coffee.notes"
        )
        .where({ user_id: id })
}

async function findByID(user_id, coffee_id) {
    return db("coffee")
        .where("id", coffee_id).first()
        .andWhere("user_id", user_id).first()
}
// this one is only used for create plant, as it doesn't get the user_id passed in
function findByID2(id) {
    return db("coffee").where({ id })
}

function create(coffee) {
    return db("coffee")
        .insert(coffee)
        .then(([id]) => findByID2(id))
}

async function remove(coffee_id, user_id) {
    await db("coffee")
        .where("id", coffee_id)
        .andWhere("user_id", user_id)
        .del()
}

async function update(coffee_id, user_id, updated) {
    await db("coffee")
        .where("id", coffee_id)
        .andWhere("user_id", user_id)
        .update(updated)
}

module.exports = {
    find,
    findByID,
    create,
    remove,
    update
}