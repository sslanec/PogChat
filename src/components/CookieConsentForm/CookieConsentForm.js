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
        // background: '#ffd42d',
        // flex: '0 0 auto',
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
      }}
      declineButtonStyle={{
        // background: '#c12a2a',
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
        Do you consent to the use of non-essential cookies and analytics? Doing
        so helps with the continued development of PogChat 😊 More information
        can be found in our{' '}
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
