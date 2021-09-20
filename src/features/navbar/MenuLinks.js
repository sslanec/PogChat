import { Box, Stack } from '@chakra-ui/react';
import MenuItem from 'features/navbar/MenuItem';
import { useSelector } from 'react-redux';
// import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';

export default function MenuLinks({ isOpen, toggle }) {
  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={[2, 2, 6, 6]}
        align="center"
        justify={['center', 'center', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
      >
        <MenuItem toggle={toggle} to="/">
          {loggedIn ? 'Chat' : 'Home'}
        </MenuItem>

        {loggedIn && (
          <MenuItem toggle={toggle} to="/user-following">
            Following
          </MenuItem>
        )}

        {loggedIn && (
          <MenuItem toggle={toggle} to="/user-settings">
            Settings
          </MenuItem>
        )}

        {/* <ColorModeSwitcher /> */}
      </Stack>
    </Box>
  );
}
