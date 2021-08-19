import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import detectEmotes from 'utils/chat/detectEmotes';
import insertEmotes from 'utils/chat/insertEmotes';
import insertSpaces from 'utils/chat/insertSpaces';
import getBadges from 'utils/chat/getBadges';
import UserContext from 'context/User/User';

export default function ChatMessage({
  bits,
  bttvEmotes,
  channelBadges,
  cheerList,
  displayName,
  emoteQuality,
  globalBadges,
  isAction,
  msg,
  reference,
  self,
  userEmotes,
  userstate,
}) {
  const { user } = useContext(UserContext);

  if (userstate['badges']) {
    var badges = getBadges(
      userstate['badges'],
      channelBadges,
      globalBadges,
      emoteQuality
    );
  }
  let msgArray = msg.split(' ');
  if (self) {
    msgArray = insertEmotes(msgArray, userEmotes, emoteQuality);
  } else {
    let msgEmotes = detectEmotes(msgArray, userstate.emotes);
    msgArray = insertEmotes(msgArray, msgEmotes, emoteQuality);
  }
  if (bits !== false) {
    msgArray = insertEmotes(msgArray, cheerList, emoteQuality, true);
  }
  msgArray = insertEmotes(msgArray, bttvEmotes, emoteQuality);

  return (
    <Text
      lineHeight={1.35}
      ref={reference}
      fontSize={user.userOptions.chatTextSize}
    >
      {badges}
      <Text
        as="span"
        fontWeight="bold"
        color={user.userOptions.usernameColors ? userstate.color : 'white'}
      >
        {displayName}
      </Text>
      {bits ? ` ${bits}: ` : ': '}
      <Text as="span" fontStyle={isAction ? 'italic' : 'normal'}>
        {insertSpaces(msgArray)}
      </Text>
    </Text>
  );
}
