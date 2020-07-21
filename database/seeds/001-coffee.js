
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      // Inserts seed entries
      return knex('coffee').insert([
        { id: 1, origin: 'Peru', notes: 'Dark chocolate, orange' },
        { id: 2, origin: 'Ethiopia', notes: 'Black tea, lemon, floral' },
        { id: 3, origin: 'Brazil', notes: 'Vanilla, blackberry' },
        { id: 4, origin: 'Rwanda', notes: 'Floral, berry like acidity' }
      ])
    })
}
