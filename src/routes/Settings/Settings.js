import { useContext } from 'react';
import {
  Checkbox,
  Container,
  Heading,
  HStack,
  Select,
  Text,
} from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function Settings(props) {
  const { user, setUser } = useContext(UserContext);
  let options = user.userOptions;

  const updateOptions = () => {
    setUser({ userOptions: options });
    localStorage.setItem('userOptions', JSON.stringify(options));
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      minHeight={0}
      paddingTop={2}
      // paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      {...props}
    >
      <Heading>Settings</Heading>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Badge Quality</Text>
        <Select
          onChange={event => {
            options.badgeQuality = event.target.value;
            updateOptions();
          }}
          value={user.userOptions.badgeQuality}
          width="auto"
        >
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </Select>
      </HStack>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Emote Quality</Text>
        <Select
          onChange={event => {
            options.emoteQuality = event.target.value;
            updateOptions();
          }}
          value={user.userOptions.emoteQuality}
          width="auto"
        >
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </Select>
      </HStack>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Username Colors</Text>
        <Checkbox
          onChange={event => {
            options.usernameColors = event.target.checked;
            updateOptions();
          }}
          size="lg"
          isChecked={user.userOptions.usernameColors}
        />
      </HStack>
    </Container>
  );
}
