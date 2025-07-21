const fetch = require('node-fetch');

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  const token = process.env.DS_TOKEN;

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch daily time
    const mainRes = await fetch('https://www.dreamingspanish.com/.netlify/functions/dayWatchedTime', { headers });
    const mainData = await mainRes.json();

    // Fetch external time (onboarding)
    const extRes = await fetch('https://www.dreamingspanish.com/.netlify/functions/externalTime', { headers });
    const extData = await extRes.json();
    const externalSeconds = extData?.externalTimes?.[0]?.timeSeconds || 0;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: JSON.stringify({ daily: mainData, externalSeconds }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
