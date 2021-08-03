import { StaticAuthProvider } from 'twitch-auth';

export default function getAuthProvider(accessToken) {
  const authProvider = new StaticAuthProvider(
    process.env.REACT_APP_CLIENT_ID,
    accessToken
  );
  return authProvider;
}

// import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';

// export default function getAuthProvider(
//   accessToken,
//   refreshToken,
//   expiryTimestamp
// ) {
//   const authProvider = new RefreshableAuthProvider(
//     new StaticAuthProvider(process.env.REACT_APP_CLIENT_ID, accessToken),
//     {
//       clientSecret: process.env.REACT_APP_CLIENT_SECRET,
//       refreshToken,
//       expiry: expiryTimestamp === null ? null : new Date(expiryTimestamp),
//       onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
//         const newTokenData = {
//           accessToken,
//           refreshToken,
//           expiryTimestamp: expiryDate === null ? null : expiryDate.getTime(),
//         };
//         sessionStorage.setItem('accessToken', newTokenData.accessToken);
//         sessionStorage.setItem('refreshToken', newTokenData.refreshToken);
//         sessionStorage.setItem('expiryTimestamp', newTokenData.expiryTimestamp);
//       },
//     }
//   );
//   return authProvider;
// }
