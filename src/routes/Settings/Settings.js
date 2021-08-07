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
  const { user } = useContext(UserContext);

  return (
    <Container display="flex" flexDirection="column" minHeight={0} {...props}>
      <Heading>Settings</Heading>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Badge Quality</Text>
        <Select width="25%">
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </Select>
      </HStack>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Emote Quality</Text>
        <Select width="25%">
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </Select>
      </HStack>
      <HStack marginTop={2} spacing="auto">
        <Text fontSize="large">Username Colors</Text>
        <Checkbox size="lg" />
      </HStack>
    </Container>
  );
}
