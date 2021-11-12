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

export default async function getRecentMessages(channel, msgAmount) {
  let messages = {};
  await fetch(
    'https://recent-messages.robotty.de/api/v2/recent-messages/' +
      channel.substring(1) +
      '?limit=' +
      msgAmount +
      '&hide_moderation_messages=true'
  )
    .then(data => data.json())
    .then(data => {
      for (var i in data['messages']) {
        let userstate = {};
        let mainSplit = data['messages'][i].split(';');
        for (var j in mainSplit) {
          let stateSplit = mainSplit[j].split('=');
          userstate[stateSplit[0]] = stateSplit[1];
        }

        // TODO add support for other messages (sub gifts, etc.)
        if (userstate['user-type'].search('PRIVMSG') !== -1) {
          if (userstate['badges'] !== '') {
            userstate['badges-raw'] = userstate['badges'];
            let badges = {};
            let badgeSplit = userstate['badges'].split(',');
            for (let i in badgeSplit) {
              let badge = badgeSplit[i].split('/');
              badges[badge[0]] = badge[1];
            }
            userstate['badges'] = badges;
          } else {
            userstate['badges'] = null;
            userstate['badges-raw'] = null;
          }

          if (userstate['emotes'] !== '') {
            let emotes = {};
            let emoteSplit = userstate['emotes'].split('/');
            for (let i in emoteSplit) {
              let emote = emoteSplit[i].split(':');
              emote[1] = emote[1].split(',');
              emotes[emote[0]] = emote[1];
            }
            userstate['emotes'] = emotes;
          } else {
            userstate['emotes'] = {};
          }

          let msg = '';
          let msgSplit = userstate['user-type'].split(channel);
          if (msgSplit[1].charAt(1) === ':') {
            msg = msgSplit[1].substring(2);
          } else {
            msg = msgSplit[1].substring(1);
          }
          delete userstate['user-type'];

          let id = userstate['id'];
          delete userstate['id'];

          messages[i] = {
            userstate,
            channel,
            self: false,
            msgType: 'chat',
            bits: false,
            id,
            msg,
          };
        }
      }
    });
  return messages;
}
