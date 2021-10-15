// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

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
          '1x': `https://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/1.0`,
          '2x': `https://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/2.0`,
          '3x': `https://static-cdn.jtvnw.net/emoticons/v2/${i}/static/light/3.0`,
        };
      }
    }
  }
  return emoteList;
}
