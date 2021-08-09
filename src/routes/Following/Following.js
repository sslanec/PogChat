import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function Following(props) {
  const { user } = useContext(UserContext);

  const refreshFollows = async id => {
    return await user.apiClient.helix.streams.getFollowedStreams(id);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (Date.now() > user.followRefresh + 10000) {
        refreshFollows(user.userAccInfo.id).then(
          data => (user.userFollows = data)
        );
        user.followRefresh = Date.now();
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container display="flex" flexDirection="column" minHeight={0} {...props}>
      <Heading>Following</Heading>
      <VStack
        align="flex-start"
        flex={[1, 1, '1px']}
        flexDirection="column"
        marginTop={2}
        overflow="auto"
      >
        {user.userFollows &&
          user.userFollows.data.map(({ userDisplayName, gameName }) => (
            <Link to={'/' + userDisplayName} key={userDisplayName}>
              <Text fontSize="large" fontWeight="bold">
                {userDisplayName}{' '}
                <Text as="span" fontSize="md" fontWeight="normal">
                  {gameName}
                </Text>
              </Text>
            </Link>
          ))}
      </VStack>
    </Container>
  );
}
