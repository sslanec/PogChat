import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function GiftMessage(props) {
  const { user } = useContext(UserContext);

  return (
    <Text fontSize={user.userOptions.chatTextSize} lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {props.displayName}
      </Text>
      {props.msg}
      <Text as="span" fontWeight="bold">
        {props.recipient}
      </Text>
    </Text>
  );
}
