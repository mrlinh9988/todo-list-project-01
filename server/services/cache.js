const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;
const client = require('../config/redisConnect');
const util = require('util');
// client.get = util.promisify(client.get)
client.hget = util.promisify(client.hget)

// Bất cứ khi nào thực hiện 1 câu truy vấn của mongoose thì hàm exec luôn được thực hiện

mongoose.Query.prototype.cache = function (options = {} || '') {
    // Nếu 1 câu query được .cache() thì sẽ set thuộc tính useCache của câu query đó bằng true
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key);

    return this;
}



// custom lại hàm exec của mongoose
mongoose.Query.prototype.exec = async function () {
    console.log(this.useCache);
    console.log('hashKey: ', this.hashKey);
    // Check xem liệu câu query có được .cache() hay không
    // Nếu không được .cache() thì sẽ thực thi query bình thường
    if (!this.useCache) {
        console.log('Not allow cache');
        return exec.apply(this, arguments);
    }

    console.log('allow cache');
    // Nếu được .cache(): 

    // Safe copy property to another object 
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));
    // console.log(key);

    // Check if have a value for key in redis
    // const cacheValue = await client.get(key);
    const cacheValue = await client.hget(this.hashKey, key);

    // Chú ý: query trong mongoose trả về kiểu dữ liệu document của mongoose, 
    // kiểu này khác với plain object trong JS
    // exec function phải trả về kết quả là mongoose document

    // Phải chuyển sang mongoose document
    // tương tự với new User({ name: 'a', age: 21 })

    // If yes return that 
    if (cacheValue) {

        const doc = JSON.parse(cacheValue); // parse xong sẽ là plain object chứ không phải mongoose document

        // Kiểm tra xem doc có phải là 1 mảng hay không
        return Array.isArray(doc)
            ? doc.map(e => new this.model(e))
            : new this.model(doc);

        // Cách 2:
        // if (JSON.parse(cacheValue).length > 1) {
        //     console.log('this is array document');
        //     const arrayDoc = JSON.parse(cacheValue);
        //     arrayDoc.forEach(e => {
        //         const doc = new this.model(e);
        //         return doc;
        //     })
        // } else {
        //     const doc = new this.model(JSON.parse(cacheValue));
        //     return doc;
        // }    
    }

    // Lưu ý vì bất cứ hàm nào của mongoose được thực thi thì hàm exec sẽ được chạy
    // nên bất cứ câu truy vấn nào cũng được cache lại trong redis
    // nhưng ta không muốn cache tất cả các câu query

    // If no issue the query and store the result in redis
    const result = await exec.apply(this, arguments); // Thực thi hàm exec gốc của mongoose
    // client.set(key, JSON.stringify(result));
    client.hset(this.hashKey, key, JSON.stringify(result));

    return result;
    // console.log(Object.keys(key))

    // exec.apply(this, arguments);
}