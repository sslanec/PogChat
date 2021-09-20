import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import getUserFollows from 'utils/api/getUserFollows';
import { updateUser } from 'features/userSlice';
import UserContext from 'context/User/User';

export default function Following({ loginLoading }) {
  const [visible, setVisible] = useState(false);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const follows = useSelector(state => state.user.userFollows);
  const followRefresh = useSelector(state => state.user.followRefresh);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const userAccInfo = useSelector(state => state.user.userAccInfo);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (Date.now() > followRefresh + 10000 && loggedIn === true) {
        setVisible(true);
        getUserFollows(user.apiClient, userAccInfo.id).then(data => {
          dispatch(
            updateUser({ userFollows: data, followRefresh: Date.now() })
          );
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
        <Spinner visibility={visible || loginLoading ? '' : 'hidden'} />
      </HStack>
      <VStack align="flex-start" overflow="auto">
        {follows &&
          follows.map(({ userName, userDisplayName, gameName }) => (
            <Link
              to={
                userDisplayName === '' ? `/${userName}` : `/${userDisplayName}`
              }
              key={userName}
            >
              <Text fontSize="large" fontWeight="bold">
                {userDisplayName === '' ? `${userName}` : `${userDisplayName}`}{' '}
                <Text as="span" fontSize="md" fontWeight="normal">
                  {gameName}
                </Text>
              </Text>
            </Link>
          ))}
      </VStack>
    </>
  );
}
