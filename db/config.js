const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
  } catch (error) {
    console.log(error);
    throw new Error('db connection fail');
  }

  console.log('DB connect!');
};

module.exports = {
  dbConnection,
};
