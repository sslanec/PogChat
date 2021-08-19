import { Box } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

export default function MenuToggle(props) {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={props.toggle}>
      {props.isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
}
