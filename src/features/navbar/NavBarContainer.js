import { Flex } from '@chakra-ui/react';

export default function NavBarContainer(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      paddingTop={2}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={3}
      {...props}
    >
      {props.children}
    </Flex>
  );
}
