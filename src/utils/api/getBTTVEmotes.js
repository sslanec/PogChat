export default async function getBTTVEmotes(channelId) {
  let emotes = {};

  // BTTV global emotes
  await fetch('https://api.betterttv.net/3/cached/emotes/global')
    .then(response => response.json())
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        let key = {};
        key['1x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/1x`;
        key['2x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/2x`;
        key['3x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/3x`;
        key['category'] = 'bttv_global';
        emotes[data[i]['code']] = key;
      }
    });

  // BTTV channel emotes
  await fetch(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`)
    .then(response => response.json())
    .then(data => {
      if (data.message !== 'user not found') {
        const channel = data['channelEmotes'];
        const shared = data['sharedEmotes'];
        for (let i in channel) {
          let key = {};
          key['1x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/1x`;
          key['2x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/2x`;
          key['3x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/3x`;
          key['category'] = 'bttv_channel';
          emotes[channel[i]['code']] = key;
        }
        for (let i in shared) {
          let key = {};
          key['1x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/1x`;
          key['2x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/2x`;
          key['3x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/3x`;
          key['category'] = 'bttv_shared';
          emotes[shared[i]['code']] = key;
        }
      }
    });

  // FFZ channel emotes
  await fetch(
    `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/` +
      `${channelId}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.message !== 'user not found') {
        for (var i in data) {
          let key = {};
          key['1x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/1`;
          key['2x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/2`;
          key['3x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/2`;
          key['category'] = 'ffz_channel';
          emotes[data[i]['code']] = key;
        }
      }
    });

  return emotes;
}
