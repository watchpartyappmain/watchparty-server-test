module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite',
    session_secret: 'keyboard cat',
    salt_rounds: 10,
    demo_user_password: 'pass1234',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    session_secret: process.env.TEST_SESSION_SECRET,
    salt_rounds: 10,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    session_secret: process.env.SESSION_SECRET,
    salt_rounds: 10,
  }
}
