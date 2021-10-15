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

export default function followersOnly(enabled, length) {
  if (enabled) {
    if (length === 0) {
      var msg = 'Chat is in followers-only mode.';
    } else if (length === 1) {
      msg =
        'Chat is in followers-only mode. You can chat after ' +
        'following for 1 minute.';
    } else if (length > 1) {
      msg =
        'Chat is in followers-only mode. You can chat after ' +
        `following for ${length} minutes.`;
    }
  } else {
    msg = 'Chat is no longer in followers-only mode.';
  }
  return msg;
}
