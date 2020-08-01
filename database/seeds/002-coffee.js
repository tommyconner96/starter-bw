
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      // Inserts seed entries
      return knex('coffee').insert([
        { user_id: 1, id: 1, origin: 'Peru', notes: 'Dark chocolate, orange' },
        { user_id: 2, id: 2, origin: 'Ethiopia', notes: 'Black tea, lemon, floral' },
        { user_id: 3, id: 3, origin: 'Brazil', notes: 'Vanilla, blackberry' },
        { user_id: 1, id: 4, origin: 'Rwanda', notes: 'Floral, berry like acidity' }
      ])
    })
}
