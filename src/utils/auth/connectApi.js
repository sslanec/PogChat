import { ApiClient } from '@twurple/api';
import getGlobalBadges from 'utils/api/getGlobalBadges';
import getUserFollows from 'utils/api/getUserFollows';
import getUserAccInfo from 'utils/api/getUserAccInfo';

export default async function connectApi(authProvider) {
  const apiClient = new ApiClient({
    authProvider,
  });
  // const userAccInfo = await apiClient.helix.users.getMe();
  const userAccInfo = await getUserAccInfo(apiClient);
  const globalBadges = await getGlobalBadges(apiClient);
  // const userFollows = await apiClient.helix.streams.getFollowedStreams(
  //   userAccInfo.id
  // );
  const userFollows = await getUserFollows(apiClient, userAccInfo.id);

  return { apiClient, userAccInfo, globalBadges, userFollows };
}
