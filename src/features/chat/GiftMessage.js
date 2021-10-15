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

import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

export default function GiftMessage({ displayName, msg, recipient }) {
  const userOptions = useSelector(state => state.user.userOptions);

  return (
    <Text fontSize={userOptions.chatTextSize} lineHeight={1.35}>
      <Text as="span" fontWeight="bold">
        {displayName}
      </Text>
      {msg}
      <Text as="span" fontWeight="bold">
        {recipient}
      </Text>
    </Text>
  );
}
