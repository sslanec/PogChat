import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
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
      if (Date.now() > user.followRefresh + 10000 && user.loggedIn === true) {
        setVisible(true);
        refreshFollows(user.userAccInfo.id).then(data => {
          setUser({ userFollows: data });
          setUser({ followRefresh: Date.now() });
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
    <>
      <HStack spacing="auto">
        <Heading paddingBottom={4}>Following</Heading>
        <Spinner visibility={visible || props.loginLoading ? '' : 'hidden'} />
      </HStack>
      <VStack align="flex-start" overflow="auto">
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
    </>
  );
}
