const redis = require('redis')
const { promisify } = require('util')


//redis-client
const client = redis.createClient()


//promisify the methods
//used to convert a method that returns responses using a callback function to return responses in a promise object.
const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)


module.exports = { client, GET_ASYNC, SET_ASYNC }