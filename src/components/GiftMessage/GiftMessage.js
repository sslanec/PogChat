import { Text } from '@chakra-ui/react';

export default function GiftMessage(props) {
  return (
    <Text lineHeight={1.35}>
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
