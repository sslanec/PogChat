export default async function getUserEmotes(apiClient, sets) {
  let emotes = {};
  let emoteSets = {};
  let emoteSetInfo = sessionStorage.getItem('emoteSetInfo');
  if (emoteSetInfo === null || emoteSetInfo === undefined) {
    emoteSetInfo = {};
  } else {
    emoteSetInfo = JSON.parse(emoteSetInfo);
  }

  const processEmotes = async data => {
    for (let i in data) {
      let emote = data[i];

      if (!(emote['emoteSetId'] in emoteSetInfo)) {
        let info = await emote.getOwner();
        if (info !== null) {
          emoteSetInfo[emote['emoteSetId']] = {
            displayName: info['displayName'],
            id: info['id'],
            name: info['name'],
            profilePictureUrl: info['profilePictureUrl'],
          };
        } else {
          emoteSetInfo[emote['emoteSetId']] = { displayName: 'Twitch Global' };
        }
      }

      if (!(emote['emoteSetId'] in emoteSets)) {
        emoteSets[emote['emoteSetId']] = {};
        emoteSets[emote['emoteSetId']]['emotes'] = {};
        emoteSets[emote['emoteSetId']]['displayName'] =
          emoteSetInfo[emote['emoteSetId']]['displayName'];
        if (emoteSets[emote['emoteSetId']]['displayName'] !== 'Twitch Global') {
          emoteSets[emote['emoteSetId']]['id'] =
            emoteSetInfo[emote['emoteSetId']]['id'];
          emoteSets[emote['emoteSetId']]['name'] =
            emoteSetInfo[emote['emoteSetId']]['name'];
          emoteSets[emote['emoteSetId']]['profilePictureUrl'] =
            emoteSetInfo[emote['emoteSetId']]['profilePictureUrl'];
        }
      }

      let ver = {};
      ver['1x'] = emote['_data']['images']['url_1x'];
      ver['2x'] = emote['_data']['images']['url_2x'];
      ver['3x'] = emote['_data']['images']['url_4x'];

      emotes[emote['name']] = ver;
      emoteSets[emote['emoteSetId']]['emotes'] = {
        ...emoteSets[emote['emoteSetId']]['emotes'],
        [emote['name']]: ver,
      };
    }
  };

  if (sets.length < 11) {
    await apiClient.helix.chat
      .getEmotesFromSets(0, sets.length)
      .then(async data => {
        await processEmotes(data);
      });
  } else {
    for (let i in sets) {
      if (i > 0 && i % 10 === 0) {
        await apiClient.helix.chat
          .getEmotesFromSets(sets.slice(i - 10, i))
          .then(async data => {
            await processEmotes(data);
          });
      }
    }
  }
  // console.log({ sets, emotes, emoteSetInfo, emoteSets });
  sessionStorage.setItem('emoteSetInfo', JSON.stringify(emoteSetInfo));
  return { emotes, sets: emoteSets };
}
