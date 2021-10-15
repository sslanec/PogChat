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

import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import detectEmotes from 'utils/chat/detectEmotes';
import insertEmotes from 'utils/chat/insertEmotes';
import insertSpaces from 'utils/chat/insertSpaces';
import getBadges from 'utils/chat/getBadges';

export default function ChatMessage2({
  bits,
  cheerList,
  msg,
  self,
  userstate,
}) {
  const userOptions = useSelector(state => state.user.userOptions);
  const userEmotes = useSelector(state => state.user.userEmotes);
  const bttvEmotes = useSelector(state => state.user.bttvEmotes);
  const globalBadges = useSelector(state => state.user.globalBadges);
  const channelBadges = useSelector(state => state.user.channelBadges);

  if (userstate['badges']) {
    var badges = getBadges(
      userstate['badges'],
      channelBadges,
      globalBadges,
      userOptions.emoteQuality
    );
  }

  let msgArray = msg.split(' ');
  if (msg !== '< message deleted >') {
    if (self) {
      msgArray = insertEmotes(msgArray, userEmotes, userOptions.emoteQuality);
    } else {
      let msgEmotes = detectEmotes(msgArray, userstate.emotes);
      msgArray = insertEmotes(msgArray, msgEmotes, userOptions.emoteQuality);
    }
    if (bits) {
      msgArray = insertEmotes(
        msgArray,
        cheerList,
        userOptions.emoteQuality,
        true
      );
    }
    msgArray = insertEmotes(msgArray, bttvEmotes, userOptions.emoteQuality);
  }

  return (
    <Text lineHeight={1.35} fontSize={userOptions.chatTextSize}>
      {badges}
      <Text
        as="span"
        fontWeight="bold"
        color={userOptions.usernameColors ? userstate.color : 'white'}
      >
        {userstate['display-name']}
      </Text>
      {bits ? ` ${bits}: ` : ': '}
      <Text
        as="span"
        fontStyle={userstate['message-type'] === 'action' ? 'italic' : 'normal'}
      >
        {insertSpaces(msgArray)}
      </Text>
    </Text>
  );
}
