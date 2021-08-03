import { API } from 'aws-amplify';

export default async function getAccountInfo(href) {
  let split = href.split('code=');
  split = split[1].split('&');
  let accessToken = split[0];
  let refreshToken = null;
  let expiryTimestamp = 0;

  const apiName = 'TwitchLogin';
  const path = '/TwitchLogin';
  const init = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: accessToken,
      redirectUrl: process.env.REACT_APP_REDIRECT_URL,
    }),
  };
  const content = await API.post(apiName, path, init);

  accessToken = content.access_token;
  // refreshToken = content.refresh_token;
  // expiryTimestamp = new Date(Date.now() + content['expires_in'] * 1000);
  // expiryTimestamp = expiryTimestamp.getTime();

  // sessionStorage.setItem('accessToken', accessToken);
  // sessionStorage.setItem('refreshToken', refreshToken);
  // sessionStorage.setItem('expiryTimestamp', expiryTimestamp);

  window.history.replaceState(null, '', process.env.REACT_APP_REDIRECT_URL);

  return { accessToken, refreshToken, expiryTimestamp };
}
