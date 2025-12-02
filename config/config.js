require('dotenv').config();

const config = {
  env : process.env.NODE_ENV || 'dev',
  port : process.env.PORT || 3000,
  dbUser : process.env.DB_USER,
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbName : process.env.DB_NAME,
  dbPort : process.env.DB_PORT,
  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
  USER_EMAIL_MAILER : process.env.USER_EMAIL_MAILER,
  USER_PASS_MAILER : process.env.USER_PASS_MAILER,
  SECRET_JWT_KEY : process.env.SECRET_JWT_KEY,
}

module.exports = {config};
