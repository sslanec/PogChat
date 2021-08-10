export default function clearStorage() {
  localStorage.setItem('accessToken', null);
  localStorage.setItem('refreshToken', null);
  localStorage.setItem('expiryTimestamp', 0);
  localStorage.removeItem('userOptions');
  localStorage.removeItem('lastChannel');
}
