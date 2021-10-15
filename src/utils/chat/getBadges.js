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

import ChatBadge from 'features/chat/ChatBadge';

export default function getBadges(
  msgBadges,
  channelBadges,
  globalBadges,
  badgeQuality
) {
  let badges = [];
  const keys = Object.keys(msgBadges);
  const qual = badgeQuality + 'x';

  for (var i in keys) {
    try {
      if (keys[i] in channelBadges) {
        if (channelBadges[keys[i]][msgBadges[keys[i]]]) {
          var src = channelBadges[keys[i]][msgBadges[keys[i]]][qual];
        } else {
          src = globalBadges[keys[i]][msgBadges[keys[i]]][qual];
        }
      } else if (keys[i] in globalBadges) {
        src = globalBadges[keys[i]][msgBadges[keys[i]]][qual];
      }
      badges.push(<ChatBadge name={keys[i]} src={src} key={i} />);
    } catch {
      console.log([
        'Broken badge',
        {
          msgBadges,
          channelBadges,
          globalBadges,
          badgeQuality,
          'keys[i]': keys[i],
          'msgBadges[keys[i]]': msgBadges[keys[i]],
        },
      ]);
    }
  }
  return badges;
}
