import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

export default function GiftMessage({ displayName, msg, recipient }) {
  const userOptions = useSelector(state => state.user.userOptions);

  return (
    <Text fontSize={userOptions.chatTextSize} lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {msg}
      <Text as="span" fontWeight="bold">
        {recipient}
      </Text>
    </Text>
  );
}
