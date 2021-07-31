export default function getStorage() {
  let accessToken = sessionStorage.getItem('accessToken');
  let refreshToken = sessionStorage.getItem('refreshToken');
  let expiryTimestamp = sessionStorage.getItem('expiryTimestamp');

  return { accessToken, refreshToken, expiryTimestamp };
}
