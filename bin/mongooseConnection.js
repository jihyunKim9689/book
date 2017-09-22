const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.connect = () => mongoose.connect(process.env.DB, {
  useMongoClient: true,
});

exports.isConnected = () => {
  if (mongoose.connection.db) return true;
  return false;
};
