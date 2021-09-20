import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

export default function EventMessage({ displayName, msg }) {
  const userOptions = useSelector(state => state.user.userOptions);

  return (
    <Text fontSize={userOptions.chatTextSize} lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {msg}
    </Text>
  );
}
