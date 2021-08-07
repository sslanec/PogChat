export default function getStorage() {
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  let expiryTimestamp = localStorage.getItem('expiryTimestamp');

  return { accessToken, refreshToken, expiryTimestamp };
}
