import { ApiClient } from 'twitch';
import getGlobalBadges from '../api/getGlobalBadges';

export default async function connectApi(authProvider) {
  const apiClient = new ApiClient({
    authProvider,
  });
  const userAccInfo = await apiClient.helix.users.getMe();
  const globalBadges = await getGlobalBadges(apiClient);
  const userFollows = await userAccInfo.getFollows();

  return { apiClient, userAccInfo, globalBadges, userFollows };
}
