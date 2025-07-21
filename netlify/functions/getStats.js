// netlify/functions/getStats.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const token = process.env.DS_TOKEN;

  const response = await fetch("https://www.dreamingspanish.com/.netlify/functions/dayWatchedTime", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }

  const data = await response.json();
return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*', // 👈 allows any origin
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
  },
  body: JSON.stringify(data),
};
  };
};
