export default async function getAccountInfo(href) {
  let split = href.split('code=');
  split = split[1].split('&');
  let accessToken = split[0];
  let refreshToken = null;
  let expiryTimestamp = null;

  const url =
    `https://id.twitch.tv/oauth2/token?` +
    `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
    `client_secret=${process.env.REACT_APP_CLIENT_SECRET}&` +
    `code=${accessToken}&` +
    `grant_type=authorization_code&` +
    `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
  const fetchData = {
    method: 'POST',
    headers: new Headers(),
  };

  const rawResponse = await fetch(url, fetchData);
  const content = await rawResponse.json();

  accessToken = content.access_token;
  refreshToken = content.refresh_token;
  expiryTimestamp = new Date(Date.now() + content['expires_in'] * 1000);
  expiryTimestamp = expiryTimestamp.getTime();

  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('expiryTimestamp', expiryTimestamp);

  window.history.replaceState(null, '', 'http://localhost:3000');

  return { accessToken, refreshToken, expiryTimestamp };
}
