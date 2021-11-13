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

import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import ChatEmote from 'features/chat/ChatEmote';

export default function Landing(props) {
  const url =
    'https://id.twitch.tv/oauth2/authorize?' +
    `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
    `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&` +
    'response_type=id_token+code&' +
    'scope=openid+chat:read+chat:edit+user:read:follows&' +
    'force_verify=true';

  return (
    <Flex flex={[1, 1, '1px']} flexDirection="column" overflow="auto">
      <Box
        paddingLeft={[3, 3, 0, 0]}
        paddingRight={[3, 3, 1, 1]}
        paddingBottom={2}
      >
        <Heading>Welcome to PogChat</Heading>
        <Heading size="md">A web-based Twitch chat alternative</Heading>

        <Heading size="sm" paddingTop={6}>
          Optimized for Mobile Use
        </Heading>
        <Text paddingTop={2}>
          Chat anywhere. PogChat is built mobile-first to enhance your Twitch
          chatting experience no matter where you watch.
        </Text>

        <Heading size="sm" paddingTop={6}>
          Third-Party Emote Support
        </Heading>
        <Text paddingTop={2}>
          Show your hype however you like with BetterTTV and FrankerFaceZ
          emotes.
        </Text>

        <HStack spacing="auto" paddingTop={2}>
          <ChatEmote
            src="https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x"
            name="catJAM"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/5b444de56b9160327d12534a/3x"
            name="pepeDS"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/5ea831f074046462f768097a/3x"
            name="KEKW"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/608f8cb439b5010444d0aaf2/3x"
            name="dekayDRUM"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x"
            name="peepoClap"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/60259d6dd47a0b2db8d1a66d/3x"
            name="DanceShake"
            height={7}
          />
          <ChatEmote
            src="https://cdn.betterttv.net/emote/5b6c5efadd8fb0185163bd4f/3x"
            name="BoneZone"
            height={7}
          />
        </HStack>

        <Heading size="md" paddingTop={6}>
          <Text as="a" href={url} textDecoration="underline">
            Log in
          </Text>{' '}
          with your Twitch account to get started!
        </Heading>
      </Box>
    </Flex>
  );
}
