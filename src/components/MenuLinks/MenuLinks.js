import { Box, Stack } from '@chakra-ui/react';
import MenuItem from '../MenuItem/MenuItem';
// import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';

export default function MenuLinks(props) {
  return (
    <Box
      display={{ base: props.isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={[2, 2, 6, 6]}
        align="center"
        justify={['center', 'center', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
      >
        <MenuItem toggle={props.toggle} to="/">
          Chat
        </MenuItem>

        <MenuItem toggle={props.toggle} to="/user-following">
          Following
        </MenuItem>

        <MenuItem toggle={props.toggle} to="/user-settings">
          Settings
        </MenuItem>
        {/* <ColorModeSwitcher /> */}
      </Stack>
    </Box>
  );
}
