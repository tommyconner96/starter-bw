exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("username").notNull().unique()
		table.text("password").notNull()
		table.text("phoneNumber").notNull()
	})
    
    await knex.schema.createTable("coffee", (table) => {
		table.increments()
		table.text("origin").notNull()
		table.text("notes").notNull()
		table.integer("user_id").references("id").inTable("users")
		.onUpdate("CASCADE")
		.onDelete("CASCADE")
	})
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
    await knex.schema.dropTableIfExists("coffee")
}