export default function clearStorage() {
  sessionStorage.setItem('accessToken', null);
  sessionStorage.setItem('refreshToken', null);
  sessionStorage.setItem('expiryTimestamp', 0);
}
