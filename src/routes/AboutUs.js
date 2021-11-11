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

import { Flex, Heading, Text } from '@chakra-ui/react';

export default function AboutUs(props) {
  return (
    <Flex flex={[1, 1, '1px']} flexDirection="column">
      <Heading>About Us</Heading>
      <Text paddingTop={2}>
        PogChat was made by{' '}
        <Text
          as="a"
          href="https://seanslanec.com/"
          target="_blank"
          textDecoration="underline"
        >
          Sean Slanec
        </Text>{' '}
        and{' '}
        <Text
          as="a"
          href="https://zoey.contact/"
          target="_blank"
          textDecoration="underline"
        >
          Zoey Taylor
        </Text>
        . We both grew up with the internet from the days of GeoCities, Coke
        Music, and five-star ratings on YouTube. Now, we are avid Twitch
        viewers, often having streams on in the background while reading or
        playing games.
      </Text>
      <Text paddingTop={2}>
        While we often watch music streamers on our TV, we found the experience
        of being a part of the chat… less than ideal. We used the official
        Twitch mobile app that would still cover a large part of the screen with
        UI when in “chat only mode” and did not support BetterTwitchTV emotes.
        We wanted to make a better chat experience for ourselves. We also saw
        others online mention having similar experiences watching on the TV and
        chatting on the Twitch app on their phones, so we figured we would make
        it available for anyone to use. If it helps us, why not see if others
        might like it too?
      </Text>
      <Text paddingTop={2}>
        So, we created PogChat, a web-based Twitch chat alternative to be part
        of the communities we love. We made PogChat to show more of the chat on
        the screen and support BTTV emotes to read the hype better. Sean has
        been working on this project for months, going through different
        documentation and ensuring all the code works together.
      </Text>
      <Text paddingTop={2}>
        We hope to support more events like polls and predictions in the future
        and make PogChat a service streamers and chat moderators would want to
        use with different customization options. We look forward to adding more
        as our users grow, so please visit again soon!
      </Text>
      <Text paddingTop={2}>
        The source code for PogChat is released under the{' '}
        <Text
          as="a"
          href="https://www.gnu.org/licenses/"
          target="_blank"
          textDecoration="underline"
        >
          GNU AGPL license
        </Text>{' '}
        and can be found on{' '}
        <Text
          as="a"
          href="https://www.github.com/sslanec/PogChat"
          target="_blank"
          textDecoration="underline"
        >
          GitHub
        </Text>
        .
      </Text>
      <Text paddingTop={2}>&#169; 2021 Sean Slanec & Zoey Taylor</Text>
    </Flex>
  );
}
