import { StaticAuthProvider } from 'twitch-auth';

export default function getAuthProvider(accessToken) {
  const authProvider = new StaticAuthProvider(
    process.env.REACT_APP_CLIENT_ID,
    accessToken
  );
  return authProvider;
}
