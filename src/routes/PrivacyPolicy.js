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

export default function PrivacyPolicy(props) {
  return (
    <Flex flex={[1, 1, '1px']} flexDirection="column" overflow="auto">
      <Heading>Privacy Policy</Heading>
      <Text paddingTop={2}>
        No information from your Twitch account is ever transmitted or used in
        any way outside of the PogChat application itself, including your email
        address and password. The access token received from Twitch upon logging
        in to your account only provides temporary and limited access to your
        account information. This token is saved only to your browser's local
        storage and is cleared upon expiration (up to four hours after receipt).
      </Text>
      <Text paddingTop={2}>
        PogChat uses Google Analytics for user count and basic demographic
        information. This information is completely anonymous and your IP
        address is not collected. Users are free to decline this usage if
        desired and will be prompted once every 30 days for their continued
        consent or dissent. More information can be found in the{' '}
        <Text
          as="a"
          target="_blank"
          decoration="underline"
          href="https://marketingplatform.google.com/about/analytics/terms/us/"
        >
          Google Analytics Terms of Service
        </Text>
        .
      </Text>
    </Flex>
  );
}
