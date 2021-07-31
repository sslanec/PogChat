export default async function getGlobalBadges(apiClient) {
  var badges = {};
  await apiClient.helix.chat.getGlobalBadges().then(data => {
    for (var i in data) {
      var ver = {};
      for (var j in data[i]['_data']['versions']) {
        ver[data[i]['_data']['versions'][j]['id']] = {};

        ver[data[i]['_data']['versions'][j]['id']]['1x'] =
          data[i]['_data']['versions'][j]['image_url_1x'];
        ver[data[i]['_data']['versions'][j]['id']]['2x'] =
          data[i]['_data']['versions'][j]['image_url_2x'];
        ver[data[i]['_data']['versions'][j]['id']]['3x'] =
          data[i]['_data']['versions'][j]['image_url_4x'];
      }
      badges[data[i]['id']] = ver;
    }
  });
  return badges;
}
