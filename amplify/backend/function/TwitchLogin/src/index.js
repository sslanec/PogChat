const aws = require('aws-sdk');
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  let bodyParse = JSON.parse(event.body);
  bodyParse = JSON.parse(bodyParse);
  const code = bodyParse.code;

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ['CLIENT_SECRET'].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const url =
    `https://id.twitch.tv/oauth2/token?` +
    `client_id=${process.env.CLIENT_ID}&` +
    `client_secret=${Parameters[0]['Value']}&` +
    `code=${code}&` +
    `grant_type=authorization_code&` +
    `redirect_uri=${process.env.REDIRECT_URL}`;
  const fetchData = {
    method: 'POST',
  };

  const rawResponse = await fetch(url, fetchData);
  const content = await rawResponse.json();

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(content),
  };
  return response;
};
