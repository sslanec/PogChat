import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function Following(props) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
    user.userFollows = await user.apiClient.helix.streams.getFollowedStreams(
      user.userAccInfo.id
    );
    setLoading(false);
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <Container display="flex" flexDirection="column" minHeight={0} {...props}>
      <FormControl as="form" onSubmit={handleSubmit}>
        <HStack spacing="auto">
          <Heading>Following</Heading>
          <Button
            disabled={disabled}
            isLoading={loading}
            size="sm"
            type="submit"
            variant="outline"
          >
            Refresh
          </Button>
        </HStack>
      </FormControl>
      <VStack
        align="flex-start"
        flex={[1, 1, '1px']}
        flexDirection="column"
        marginTop={2}
        overflow="auto"
      >
        {user.userFollows &&
          user.userFollows.data.map(({ userDisplayName }) => (
            <Link to={'/' + userDisplayName} key={userDisplayName + '_link'}>
              <Text key={userDisplayName} fontSize="large">
                {userDisplayName}
              </Text>
            </Link>
          ))}
      </VStack>
    </Container>
  );
}
