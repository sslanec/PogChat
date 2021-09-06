import { Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <HStack>
      <Flex width="100%" justify="flex-start" {...props}>
        <Link to="/about-us">
          <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
            About Us
          </Text>
        </Link>
        <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
          &#183;
        </Text>
        <Link to="/privacy-policy">
          <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
            Privacy
          </Text>
        </Link>
      </Flex>
      <Flex width="100%" justify="flex-end" {...props}>
        <Text
          // as="a"
          // href="https://github.com/sslanec"
          // target="_blank"
          fontSize="sm"
          paddingTop={1}
          paddingBottom={1}
          paddingRight={2}
        >
          &#169; 2021 Sean S.
        </Text>
      </Flex>
    </HStack>
  );
}
