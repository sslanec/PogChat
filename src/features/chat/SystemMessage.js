import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import UserContext from 'context/User/User';

export default function SystemMessage(props) {
  const { user } = useContext(UserContext);

  return (
    <Text
      fontSize={user.userOptions.chatTextSize}
      fontWeight="bold"
      lineHeight={1.35}
    >
      {props.msg}
    </Text>
  );
}
