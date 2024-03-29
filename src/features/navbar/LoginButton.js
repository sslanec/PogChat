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

import { Button, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ReactComponent as TwitchLogo } from 'assets/twitch-logo.svg';

const url =
  'https://id.twitch.tv/oauth2/authorize?' +
  `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
  `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&` +
  'response_type=id_token+code&' +
  'scope=openid+chat:read+chat:edit+user:read:follows&' +
  'force_verify=true';

const handleClick = event => {
  event.preventDefault();
  localStorage.setItem('accessToken', null);
  localStorage.setItem('expiryTimestamp', 0);
  window.open(url, '_self');
};

const lightModeColor = '#1A202C';
const lightModeAlpha = '1';
const darkModeColor = 'white';
const darkModeAlpha = '0.92';

export default function LoginButton() {
  const loginLoading = useSelector(state => state.user.loginLoading);
  const userAccInfo = useSelector(state => state.user.userAccInfo);
  const iconColor = useColorModeValue(lightModeColor, darkModeColor);
  const iconAlpha = useColorModeValue(lightModeAlpha, darkModeAlpha);

  return (
    <Button
      key={'LoginButton_' + userAccInfo.displayName}
      onClick={handleClick}
      iconSpacing={1.5}
      isLoading={loginLoading}
      leftIcon={
        userAccInfo.displayName === 'Login' ? (
          <TwitchLogo fill={iconColor} fillOpacity={iconAlpha} />
        ) : (
          ''
        )
      }
      size="sm"
    >
      {userAccInfo.displayName}
    </Button>
  );
}
