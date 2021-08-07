import { Flex, Text } from '@chakra-ui/react';

export default function Footer(props) {
  return (
    <Flex width="100%" justify="flex-end" {...props}>
      <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingRight={2}>
        &#169; 2021 Sean Slanec
      </Text>
    </Flex>
  );
}
