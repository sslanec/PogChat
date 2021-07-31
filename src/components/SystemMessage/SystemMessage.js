import { Text } from '@chakra-ui/react';

export default function SystemMessage(props) {
  return (
    <Text fontWeight="bold" lineHeight={1.35}>
      {props.msg}
    </Text>
  );
}
