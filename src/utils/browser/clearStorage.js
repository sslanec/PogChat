export default function clearStorage() {
  localStorage.setItem('accessToken', null);
  localStorage.setItem('refreshToken', null);
  localStorage.setItem('expiryTimestamp', 0);
}
