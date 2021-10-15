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

import { Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <HStack>
      <Flex width="100%" justify="flex-start" {...props}>
        <Link to="/about-us">
          <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
            About Us
          </Text>
        </Link>
        <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
          &#183;
        </Text>
        <Link to="/privacy-policy">
          <Text fontSize="sm" paddingTop={1} paddingBottom={1} paddingLeft={2}>
            Privacy
          </Text>
        </Link>
      </Flex>
      <Flex width="100%" justify="flex-end" {...props}>
        <Text
          // as="a"
          // href="https://github.com/sslanec"
          // target="_blank"
          fontSize="sm"
          paddingTop={1}
          paddingBottom={1}
          paddingRight={2}
        >
          &#169; 2021 Sean S. & Zoey T.
        </Text>
      </Flex>
    </HStack>
  );
}
