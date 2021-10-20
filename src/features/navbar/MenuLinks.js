// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

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

        <MenuItem toggle={toggle} to="/about-us">
          About
        </MenuItem>

        <MenuItem toggle={toggle} to="/privacy-policy">
          Privacy
        </MenuItem>

        {/* <ColorModeSwitcher /> */}
      </Stack>
    </Box>
  );
}
