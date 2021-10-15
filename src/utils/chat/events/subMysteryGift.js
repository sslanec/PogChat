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

import getSubTier from '../../getSubTier';

export default function subMysteryGift(numOfSubs, methods, userstate) {
  const tier = getSubTier(methods);

  var msg = ' is gifting';
  if (numOfSubs === 1) {
    msg += ` a ${tier} Sub to the community!`;
  } else {
    msg += ` ${numOfSubs} ${tier} Subs to the community!`;
  }

  if (userstate['msg-param-sender-count']) {
    msg += ` (${userstate['msg-param-sender-count']} lifetime Gift Subs)`;
  }
  return msg;
}
