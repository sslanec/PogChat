import { useContext } from 'react';
import { Box, Checkbox, Heading, HStack, Select, Text } from '@chakra-ui/react';
import UserContext from 'context/User/User';
import ClearDataAlert from 'components/ClearDataAlert/ClearDataAlert';

export default function Settings(props) {
  const { user, setUser } = useContext(UserContext);
  let options = user.userOptions;

  const updateOptions = () => {
    setUser({ userOptions: options });
    localStorage.setItem('userOptions', JSON.stringify(options));
  };

  return (
    <>
      <Heading>Settings</Heading>
      <Box paddingTop={4} overflow="auto">
        <HStack spacing="auto">
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
        <HStack paddingTop={4} spacing="auto">
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
        <HStack paddingTop={4} spacing="auto">
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
        {/* TODO Adjust emote sizes to match text sizes */}
        <HStack paddingTop={4} spacing="auto">
          <Text fontSize="large">Chat Text Size</Text>
          <Select
            onChange={event => {
              options.chatTextSize = event.target.value;
              updateOptions();
            }}
            value={user.userOptions.chatTextSize}
            width="auto"
          >
            <option value="6xl">6X-Large</option>
            <option value="5xl">5X-Large</option>
            <option value="4xl">4X-Large</option>
            <option value="3xl">3X-Large</option>
            <option value="2xl">2X-Large</option>
            <option value="xl">X-Large</option>
            <option value="lg">Large</option>
            <option value="md">Medium</option>
            <option value="sm">Small</option>
            <option value="xs">X-Small</option>
          </Select>
        </HStack>
        <ClearDataAlert paddingTop={4} />
      </Box>
    </>
  );
}
