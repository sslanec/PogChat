export default function detectEmotes(msg, emotes) {
  let emoteList = {};
  for (var i in emotes) {
    const e = emotes[i];
    for (var j in e) {
      var mote = e[j];
      if (typeof mote == 'string') {
        mote = mote.split('-');
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        const id = `${msg}`.substring(mote[0], mote[1] + 1);
        emoteList[id] = {
          '1x': `http://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/1.0`,
          '2x': `http://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/2.0`,
          '3x': `http://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/3.0`,
        };
      }
    }
  }
  return emoteList;
}
