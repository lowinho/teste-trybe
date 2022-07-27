const mongoConnection = require('./mongoConnection');

const getUserByEmail = async (email) => {
  const db = await mongoConnection.connection();
  const user = await db.collection('users').findOne({ email });

  return user;
};

const createUser = async (name, email, password, role) => {
  const db = await mongoConnection.connection();
  const { insertedId: _id } = await db.collection('users')
    .insertOne({ name, email, password, role });
  return { _id, name, email, role };
};

module.exports = {
  createUser,
  getUserByEmail,
};
