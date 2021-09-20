export default async function getUserAccInfo(apiClient) {
  let info = {};
  await apiClient.helix.users.getMe().then(data => {
    info['displayName'] = data['displayName'];
    info['id'] = data['id'];
    info['name'] = data['name'];
    info['profilePictureUrl'] = data['profilePictureUrl'];
  });
  return info;
}
