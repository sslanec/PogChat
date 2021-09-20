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
