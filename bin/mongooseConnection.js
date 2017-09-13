const path = process.cwd();
const config = require(path + '/config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.connect = (done) => {
    // CONNECT TO MONGODB SERVER
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongod server");
        if(done){
            done();
        }
    });
    mongoose.connect(config.db, {useMongoClient:true});
}

exports.isConnected = () => {
    if(mongoose.connection.db){
        return true;
    }else{
        return false;
    }
}

  