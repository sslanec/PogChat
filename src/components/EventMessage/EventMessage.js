import { Text } from '@chakra-ui/react';

export default function EventMessage({ displayName, msg }) {
  return (
    <Text lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {msg}
    </Text>
  );
}
