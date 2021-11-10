// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import getUserFollows from 'utils/api/getUserFollows';
import { updateUser } from 'context/userSlice';
import UserContext from 'context/User';

export default function Following() {
  const [visible, setVisible] = useState(false);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const follows = useSelector(state => state.user.userFollows);
  const followRefresh = useSelector(state => state.user.followRefresh);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const loginLoading = useSelector(state => state.user.loginLoading);
  const userAccInfo = useSelector(state => state.user.userAccInfo);
  const connected = useSelector(state => state.user.connected);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (loggedIn === false && loginLoading === false) {
        navigate('/');
      }

      if (connected === true) {
        user.chatClient.disconnect().then(() => {
          dispatch(updateUser({ connected: false }));
        });
      }

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
