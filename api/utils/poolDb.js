const db = require('./../../libs/postgres.pool');
const boom = require('@hapi/boom');

async function sendQuery(query, values) {
  try {
    const res = await db.query(query, values);
    return res;
  } catch {
    throw boom.internal('We cannot execute the request');
  }
}

module.exports = { sendQuery };
