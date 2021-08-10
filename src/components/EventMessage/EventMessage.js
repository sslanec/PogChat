import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function EventMessage({ displayName, msg }) {
  const { user } = useContext(UserContext);

  return (
    <Text fontSize={user.userOptions.chatTextSize} lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {msg}
    </Text>
  );
}
