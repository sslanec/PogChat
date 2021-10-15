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

export default async function getUserFollows(apiClient, userId) {
  let follows = [];
  await apiClient.helix.streams.getFollowedStreams(userId).then(data => {
    for (var i in data['data']) {
      const follow = data['data'][i];
      follows.push({
        gameName: follow['gameName'],
        id: follow['id'],
        title: follow['title'],
        type: follow['type'],
        userDisplayName: follow['userDisplayName'],
        userId: follow['userId'],
        userName: follow['userName'],
        viewers: follow['viewers'],
      });
    }
  });
  return follows;
}
