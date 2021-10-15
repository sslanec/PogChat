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

export default function getCheerList(cheerParse) {
  let cheerList = {};
  for (let i in cheerParse) {
    let key = cheerParse[i]['name'] + cheerParse[i]['amount'];
    key = key.toLowerCase();
    let url = cheerParse[i]['displayInfo']['url'];
    url = url.substring(0, url.length - 5);
    cheerList[key] = {
      '1x': url + '2.gif',
      '2x': url + '3.gif',
      '3x': url + '4.gif',
    };
  }
  return cheerList;
}
