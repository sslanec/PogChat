export default async function getBTTVEmotes(channelId) {
  let emotes = {};

  // BTTV global emotes
  fetch('https://api.betterttv.net/3/cached/emotes/global')
    .then(response => response.json())
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        var ver = {};
        ver['1x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/1x`;
        ver['2x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/2x`;
        ver['3x'] = `https://cdn.betterttv.net/emote/${data[i]['id']}/3x`;
        emotes[data[i]['code']] = ver;
      }
    });

  // BTTV channel emotes
  fetch(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`)
    .then(response => response.json())
    .then(data => {
      const channel = data['channelEmotes'];
      const shared = data['sharedEmotes'];
      for (let i in channel) {
        let ver = {};
        ver['1x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/1x`;
        ver['2x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/2x`;
        ver['3x'] = `https://cdn.betterttv.net/emote/${channel[i]['id']}/3x`;
        emotes[channel[i]['code']] = ver;
      }
      for (let i in shared) {
        let ver = {};
        ver['1x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/1x`;
        ver['2x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/2x`;
        ver['3x'] = `https://cdn.betterttv.net/emote/${shared[i]['id']}/3x`;
        emotes[shared[i]['code']] = ver;
      }
    });

  // FFZ channel emotes
  fetch(
    `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/` +
      `${channelId}`
  )
    .then(response => response.json())
    .then(data => {
      for (var i in data) {
        let ver = {};
        ver['1x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/1`;
        ver['2x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/2`;
        ver['3x'] = `https://cdn.frankerfacez.com/emote/${data[i]['id']}/2`;
        emotes[data[i]['code']] = ver;
      }
    });

  return emotes;
}
