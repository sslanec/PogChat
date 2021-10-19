// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

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

  const fetchData = { method: 'POST' };
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
