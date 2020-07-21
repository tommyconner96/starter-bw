exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("username").notNull().unique()
		table.text("password").notNull()
	})

	await knex.schema.createTable("sessions", (table) => {
		table.increments()
		table.integer("user_id")
			.notNull()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table.timestamp("expires")
    })
    
    await knex.schema.createTable("coffee", (table) => {
		table.increments()
		table.text("origin").notNull()
		table.text("notes").notNull()
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("sessions")
    await knex.schema.dropTableIfExists("users")
    await knex.schema.dropTableIfExists("coffee")
}