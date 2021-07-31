import { Flex, Text } from '@chakra-ui/react';

export default function Footer(props) {
  return (
    <Flex height={8} width="100%" justify="center" {...props}>
      <Text marginTop="auto" marginBottom="auto">
        Footer
      </Text>
    </Flex>
  );
}
