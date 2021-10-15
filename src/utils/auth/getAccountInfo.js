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

import { API } from 'aws-amplify';

export default async function getAccountInfo(href) {
  let split = href.split('code=');
  split = split[1].split('&');
  let accessToken = split[0];
  let refreshToken = null;
  let expiryTimestamp = 0;
  window.history.replaceState({}, document.title, '/');

  const apiName = 'TwitchLogin';
  const path = '/TwitchLogin';
  const init = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: accessToken,
      redirectUrl: process.env.REACT_APP_REDIRECT_URL,
    }),
  };
  const content = await API.post(apiName, path, init);
  // console.log({ content });

  accessToken = content.access_token;
  // refreshToken = content.refresh_token;
  expiryTimestamp = new Date(Date.now() + content['expires_in'] * 1000);
  expiryTimestamp = expiryTimestamp.getTime();

  localStorage.setItem('accessToken', accessToken);
  // localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expiryTimestamp', expiryTimestamp);

  return { accessToken, refreshToken, expiryTimestamp };
}
