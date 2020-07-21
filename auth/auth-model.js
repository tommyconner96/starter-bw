const db = require("../database/data")
const bcrypt = require("bcryptjs")

async function add(data) {
    const [id] = await db("sessions").insert(data)
    return findById(id)
}

async function addUser(user) {
	user.password = await bcrypt.hash(user.password, 14)

	const [id] = await db("users").insert(user)
	return findById(id)
}

function findByUsername(username) {
	return db("users")
		.where({ username })
		.first()
}


function findById(id) {
    return db("sessions")
        .where("id", id)
        .first()
}

function deleteById(id) {
    return db("sessions")
        .where("id", id)
        .del()
}

module.exports = {
    add,
    addUser,
    findByUsername,
    findById,
    deleteById,
}