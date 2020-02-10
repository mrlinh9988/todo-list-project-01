const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;
const client = require('../config/redisConnect');
const util = require('util');
client.get = util.promisify(client.get)


// custom lại hàm exec của mongoose
mongoose.Query.prototype.exec = async function () {
    // console.log('Run query');
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

    // Safe copy property to another object 
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));
    console.log(key);

    // Check if have a value for key in redis
    const cacheValue = await client.get(key);

    // If yes return that 
    if (cacheValue) {
        return JSON.parse(cacheValue);
    }
    // If no issue the query and store the result in redis
    const result = await exec.apply(this, arguments); // Thực thi hàm exec gốc của mongoose
    client.set(key, JSON.stringify(result));

    return result;
    // console.log(Object.keys(key))
}