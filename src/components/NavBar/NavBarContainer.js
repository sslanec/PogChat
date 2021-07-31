import { Flex } from '@chakra-ui/react';

export default function NavBarContainer(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      padding={2}
      background="transparent"
      color="white"
      {...props}
    >
      {props.children}
    </Flex>
  );
}
