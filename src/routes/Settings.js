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

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import ClearDataAlert from 'components/ClearDataAlert';
import { updateUser } from 'context/userSlice';

export default function Settings(props) {
  const dispatch = useDispatch();
  const userOptions = useSelector(state => state.user.userOptions);
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.user.loggedIn);

  let options = {};
  for (let i in userOptions) {
    options[i] = userOptions[i];
  }

  const updateOptions = () => {
    dispatch(updateUser({ userOptions: options }));
    localStorage.setItem('userOptions', JSON.stringify(options));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (loggedIn === false) {
        navigate('/');
      }
    }
    return () => (mounted = false);
  });

  return (
    <>
      <Heading>Settings</Heading>
      {/* TODO Replace Boxes and Stacks with Flex */}
      <Box paddingTop={4}>
        <HStack spacing="auto">
          <Text fontSize="large">Badge Quality</Text>
          <Select
            onChange={event => {
              options.badgeQuality = event.target.value;
              updateOptions();
            }}
            value={userOptions.badgeQuality}
            width="auto"
            variant="filled"
          >
            <option value={3}>High</option>
            <option value={2}>Medium</option>
            <option value={1}>Low</option>
          </Select>
        </HStack>

        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Emote Quality</Text>
          <Select
            onChange={event => {
              options.emoteQuality = event.target.value;
              updateOptions();
            }}
            value={userOptions.emoteQuality}
            width="auto"
            variant="filled"
          >
            <option value={3}>High</option>
            <option value={2}>Medium</option>
            <option value={1}>Low</option>
          </Select>
        </HStack>

        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Username Colors</Text>
          <Checkbox
            onChange={event => {
              options.usernameColors = event.target.checked;
              updateOptions();
            }}
            size="lg"
            isChecked={userOptions.usernameColors}
          />
        </HStack>

        {/* TODO Adjust emote sizes to match text sizes */}
        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Chat Text Size</Text>
          <Select
            onChange={event => {
              options.chatTextSize = event.target.value;
              updateOptions();
            }}
            value={userOptions.chatTextSize}
            width="auto"
            variant="filled"
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

        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Dark Mode</Text>
          <Checkbox
            onChange={() => {
              toggleColorMode();
            }}
            isChecked={useColorModeValue(false, true)}
            size="lg"
          ></Checkbox>
        </HStack>

        {/* TODO Make opt-in with dialog on first login */}
        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Load Recent Messages</Text>
          <Checkbox
            onChange={event => {
              options.loadRecent = event.target.checked;
              updateOptions();
            }}
            size="lg"
            isChecked={userOptions.loadRecent}
          />
        </HStack>

        <HStack paddingTop={6} spacing="auto">
          <Text fontSize="large">Recent message limit</Text>
          <Select
            width="auto"
            variant="filled"
            disabled={options.loadRecent ? false : true}
            onChange={event => {
              options.msgAmount = event.target.value;
              updateOptions();
            }}
            value={userOptions.msgAmount}
          >
            <option value={100}>100</option>
            <option value={75}>75</option>
            <option value={50}>50</option>
            <option value={25}>25</option>
          </Select>
        </HStack>

        <HStack paddingTop={3}>
          <Text>
            Recent messages are loaded via a third-party API that requires
            sending the names of the channels you are joining.{' '}
            <Text
              as="a"
              href="https://recent-messages.robotty.de/"
              target="_blank"
              textDecoration="underline"
            >
              Learn more
            </Text>
            .
          </Text>
        </HStack>

        <ClearDataAlert paddingTop={6} paddingBottom={1} />
      </Box>
    </>
  );
}
