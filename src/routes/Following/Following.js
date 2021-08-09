import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import UserContext from '../../context/User/User';

export default function Following(props) {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const refreshFollows = async id => {
    return await user.apiClient.helix.streams.getFollowedStreams(id);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (Date.now() > user.followRefresh + 10000) {
        setVisible(true);
        refreshFollows(user.userAccInfo.id).then(data => {
          setUser({ userFollows: data });
          user.followRefresh = Date.now();
          setVisible(false);
        });
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <HStack spacing="auto">
        <Heading>Following</Heading>
        <Spinner visibility={visible ? '' : 'hidden'} />
      </HStack>
      <VStack
        align="flex-start"
        flex={[1, 1, '1px']}
        flexDirection="column"
        marginTop={2}
        overflow="auto"
      >
        {user.userFollows &&
          user.userFollows.data.map(
            ({ userName, userDisplayName, gameName }) => (
              <Link
                to={
                  userDisplayName === ''
                    ? `/${userName}`
                    : `/${userDisplayName}`
                }
                key={userName}
              >
                <Text fontSize="large" fontWeight="bold">
                  {userDisplayName === ''
                    ? `${userName}`
                    : `${userDisplayName}`}{' '}
                  <Text as="span" fontSize="md" fontWeight="normal">
                    {gameName}
                  </Text>
                </Text>
              </Link>
            )
          )}
      </VStack>
    </Container>
  );
}
