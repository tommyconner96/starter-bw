module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./database/auth.db3",
  },
  migrations: {
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    },
  },
  production: {
    client: "pg",
    // useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done)
    //   },
    // },
  }
}
