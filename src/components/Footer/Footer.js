import { Flex, Text } from '@chakra-ui/react';

export default function Footer(props) {
  return (
    <Flex height={8} width="100%" justify="flex-end" {...props}>
      <Text marginTop="auto" marginBottom="auto" marginRight={2}>
        &#169; 2021 Sean Slanec
      </Text>
    </Flex>
  );
}
