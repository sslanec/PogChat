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

import ChatEmote from 'features/chat/ChatEmote';

export default function insertEmotes(
  msgArray,
  emoteList,
  emoteQuality,
  isCheer = false
) {
  let qual = emoteQuality + 'x';
  let tempMsg = [];

  if (isCheer) {
    for (let i in msgArray) {
      tempMsg[i] = `${msgArray[i]}`.toLowerCase();
    }
  }

  for (let i in msgArray) {
    if (isCheer === false) {
      if (msgArray[i] in emoteList) {
        msgArray[i] = (
          <ChatEmote
            name={msgArray[i]}
            src={emoteList[msgArray[i]][qual]}
            key={i}
          />
        );
      }
    } else {
      if (tempMsg[i] in emoteList) {
        msgArray[i] = (
          <ChatEmote
            name={msgArray[i]}
            src={emoteList[tempMsg[i]][qual]}
            key={i}
          />
        );
      }
    }
  }
  return msgArray;
}
