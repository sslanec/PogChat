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

import { Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import ReactGA4 from 'react-ga4';
import ReactGA from 'react-ga';

export default function CookieConsentForm(props) {
  return (
    <CookieConsent
      // debug={true}
      enableDeclineButton={true}
      flipButtons={true}
      buttonText="Yes, of course!"
      declineButtonText="No, thank you"
      expires={30}
      ButtonComponent={Button}
      disableButtonStyles={true}
      buttonStyle={{
        background: '#454545',
        // flex: '0 0 auto',
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
      }}
      declineButtonStyle={{
        background: '#454545',
        // flex: '0 0 auto',
        marginRight: 10,
        marginBottom: 10,
        // marginLeft: 10,
      }}
      style={{
        alignItems: 'center',
        zIndex: '0',
        position: 'static',
      }}
      onAccept={() => {
        localStorage.setItem('analyticsConsent', 'true');
        ReactGA4.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_GA4);
        ReactGA4.send({ hitType: 'pageview' });
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_UA);
        ReactGA.pageview(window.location.pathname);
      }}
      onDecline={() => {
        localStorage.setItem('analyticsConsent', 'false');
      }}
    >
      <Text>
        Allow non-essential cookies and anonymous analytics? Doing so helps with
        the continued development of PogChat 😊 More information can be found in
        our{' '}
        <Link to="/privacy-policy">
          <Text as="span" decoration="underline">
            Privacy Policy
          </Text>
        </Link>
        .
      </Text>
    </CookieConsent>
  );
}
