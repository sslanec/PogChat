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

export default async function getGlobalBadges(apiClient) {
  var badges = {};
  await apiClient.helix.chat.getGlobalBadges().then(data => {
    for (var i in data) {
      var ver = {};
      for (var j in data[i]['versions']) {
        ver[data[i]['versions'][j]['id']] = {};

        ver[data[i]['versions'][j]['id']]['1x'] =
          data[i]['versions'][j].getImageUrl(1);
        ver[data[i]['versions'][j]['id']]['2x'] =
          data[i]['versions'][j].getImageUrl(2);
        ver[data[i]['versions'][j]['id']]['3x'] =
          data[i]['versions'][j].getImageUrl(4);
      }
      badges[data[i]['id']] = ver;
    }
  });
  return badges;
}
