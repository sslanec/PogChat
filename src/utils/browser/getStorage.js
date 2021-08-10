export default function getStorage() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expiryTimestamp = localStorage.getItem('expiryTimestamp');
  const userOptions = localStorage.getItem('userOptions');

  return { accessToken, refreshToken, expiryTimestamp, userOptions };
}
