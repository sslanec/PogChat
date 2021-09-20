export default async function getUserFollows(apiClient, userId) {
  let follows = [];
  await apiClient.helix.streams.getFollowedStreams(userId).then(data => {
    for (var i in data['data']) {
      const follow = data['data'][i];
      follows.push({
        gameName: follow['gameName'],
        id: follow['id'],
        title: follow['title'],
        type: follow['type'],
        userDisplayName: follow['userDisplayName'],
        userId: follow['userId'],
        userName: follow['userName'],
        viewers: follow['viewers'],
      });
    }
  });
  return follows;
}
