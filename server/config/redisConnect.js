const redis = require('redis');
const client = redis.createClient();
client.on('connect', () => {
    console.log('Redis client connected')
});
client.on('error', (error) => {
    console.log('Redis not connected', error)
});

module.exports = client;