const db = require('../database/data')

function get() {
    return db('coffee')
}

function getById(id) {
    return db('coffee')
        .where({ id })
        .first()
}


function insert(user) {
    return db('coffee')
        .insert(user)
        .then(ids => {
            return getById(ids[0])
        })
}

function update(id, changes) {
    return db('coffee')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('coffee')
        .where('id', id)
        .del()
}

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
}
