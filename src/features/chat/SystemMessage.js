import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

export default function SystemMessage({ msg }) {
  const userOptions = useSelector(state => state.user.userOptions);

  return (
    <Text
      fontSize={userOptions.chatTextSize}
      fontWeight="bold"
      lineHeight={1.35}
    >
      {msg}
    </Text>
  );
}
