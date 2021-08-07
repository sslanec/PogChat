import { API } from 'aws-amplify';

export default async function getAccountInfo(href) {
  let split = href.split('code=');
  split = split[1].split('&');
  let accessToken = split[0];
  let refreshToken = null;
  let expiryTimestamp = 0;
  window.history.replaceState(null, '', process.env.REACT_APP_REDIRECT_URL);

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
  refreshToken = content.refresh_token;
  expiryTimestamp = new Date(Date.now() + content['expires_in'] * 1000);
  expiryTimestamp = expiryTimestamp.getTime();

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expiryTimestamp', expiryTimestamp);

  return { accessToken, refreshToken, expiryTimestamp };
}
