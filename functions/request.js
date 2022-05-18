const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

exports.handler = async function(event) {
    const queryString = Object.keys(event.queryStringParameters).map(key => {
        return `${key}=${event.queryStringParameters[key]}`;
    }).join('&');

    const { data } = await axios({
        url: `${process.env.API_ENDPOINT}?apikey=${process.env.API_KEY}&${queryString}`
    })
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
