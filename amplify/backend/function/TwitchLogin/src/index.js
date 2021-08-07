/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["CLIENT_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const aws = require('aws-sdk');
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  let bodyParse = JSON.parse(event.body);
  bodyParse = JSON.parse(bodyParse);
  const code = bodyParse.code;
  const redirectUrl = bodyParse.redirectUrl;

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
    `redirect_uri=${redirectUrl}`;
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
