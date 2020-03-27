const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users');
  //return null;
}

function findBy(filter) {
  return db('users').where(filter);
  //return null;
}

async function add(user) {
 const [id] = await db('users').insert(user);

  return findById(id);
  //return null;
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
    return null;
}
