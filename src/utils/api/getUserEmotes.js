export default async function getUserEmotes(apiClient, sets) {
  var emotes = {};
  if (sets.length < 11) {
    await apiClient.helix.chat.getEmotesFromSets(0, sets.length).then(data => {
      for (var i in data) {
        var ver = {};
        ver['1x'] = data[i]['_data']['images']['url_1x'];
        ver['2x'] = data[i]['_data']['images']['url_2x'];
        ver['3x'] = data[i]['_data']['images']['url_4x'];
        emotes[data[i]['name']] = ver;
      }
    });
  } else {
    for (var i in sets) {
      if (i > 0 && i % 10 === 0) {
        await apiClient.helix.chat
          .getEmotesFromSets(sets.slice(i - 10, i))
          .then(data => {
            for (var i in data) {
              var ver = {};
              ver['1x'] = data[i]['_data']['images']['url_1x'];
              ver['2x'] = data[i]['_data']['images']['url_2x'];
              ver['3x'] = data[i]['_data']['images']['url_4x'];
              emotes[data[i]['name']] = ver;
            }
          });
      }
    }
  }
  return emotes;
}
