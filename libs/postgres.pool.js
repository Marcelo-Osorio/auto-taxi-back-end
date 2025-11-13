const {Pool} = require('pg');
const {config} = require('./../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({connectionString : URI});
module.exports = pool;

// CREATE TYPE trip_status AS ENUM ('waiting', 'in progress', 'finalized');
// CREATE TYPE taxi_status AS ENUM ('enabled', 'reserved', 'return');
// CREATE TYPE cancellation_type AS ENUM ('early', 'late');
// CREATE TYPE account_type AS ENUM ('application','google','facebook');
// CREATE TYPE plan_type AS ENUM ('basic','premium');
// CREATE TYPE payment_type AS ENUM ('monthly');
// CREATE TYPE final_state AS ENUM ('taken', 'canceled', 'abandonment');
