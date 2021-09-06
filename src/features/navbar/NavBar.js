import { useState } from 'react';
import NavBarContainer from 'features/navbar/NavBarContainer';
import MenuToggle from 'features/navbar/MenuToggle';
import MenuLinks from 'features/navbar/MenuLinks';
import { Avatar, HStack } from '@chakra-ui/react';
import LoginButton from 'features/navbar/LoginButton';

export default function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <HStack>
        <LoginButton
          isLoading={props.loginLoading}
          text={props.displayName}
        ></LoginButton>
        <Avatar
          size="sm"
          src={props.avatarUrl}
          visibility={props.loggedIn ? '' : 'hidden'}
        ></Avatar>
      </HStack>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        avatarUrl={props.avatarUrl}
        displayName={props.displayName}
        isOpen={isOpen}
        loggedIn={props.loggedIn}
        loginLoading={props.loginLoading}
        toggle={toggle}
      />
    </NavBarContainer>
  );
}
