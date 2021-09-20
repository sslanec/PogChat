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
