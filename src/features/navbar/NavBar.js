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

import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBarContainer from 'features/navbar/NavBarContainer';
import MenuToggle from 'features/navbar/MenuToggle';
import MenuLinks from 'features/navbar/MenuLinks';
import { Avatar, HStack } from '@chakra-ui/react';
import LoginButton from 'features/navbar/LoginButton';

export default function NavBar() {
  const userAccInfo = useSelector(state => state.user.userAccInfo);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <HStack>
        <LoginButton />
        <Avatar
          size="sm"
          src={userAccInfo.profilePictureUrl}
          visibility={loggedIn ? '' : 'hidden'}
        ></Avatar>
      </HStack>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        isOpen={isOpen}
        toggle={toggle}
      />
    </NavBarContainer>
  );
}
