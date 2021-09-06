import { Box, Stack } from '@chakra-ui/react';
import MenuItem from 'features/navbar/MenuItem';
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
          {props.loggedIn ? 'Chat' : 'Home'}
        </MenuItem>

        {props.loggedIn && (
          <MenuItem toggle={props.toggle} to="/user-following">
            Following
          </MenuItem>
        )}

        {props.loggedIn && (
          <MenuItem toggle={props.toggle} to="/user-settings">
            Settings
          </MenuItem>
        )}

        {/* <ColorModeSwitcher /> */}
      </Stack>
    </Box>
  );
}
