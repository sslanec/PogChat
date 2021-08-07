import { Text } from '@chakra-ui/react';
import detectEmotes from '../../utils/chat/detectEmotes';
import insertEmotes from '../../utils/chat/insertEmotes';
import insertSpaces from '../../utils/chat/insertSpaces';
import getBadges from '../../utils/chat/getBadges';

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
    <Text lineHeight={1.35} ref={reference}>
      {badges}
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {bits ? ` ${bits}: ` : ': '}
      <Text as="span" fontStyle={isAction ? 'italic' : 'normal'}>
        {insertSpaces(msgArray)}
      </Text>
    </Text>
  );
}
