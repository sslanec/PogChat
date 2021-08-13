import { Box, Button } from '@chakra-ui/react';
import twitchLogo from './twitchLogo.svg';

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

export default function LoginButton(props) {
  return (
    <Button
      key={'LoginButton_' + props.text}
      onClick={handleClick}
      iconSpacing={1.5}
      isLoading={props.isLoading}
      leftIcon={
        props.text === 'Login' ? (
          <Box as="img" height={5} width={5} src={twitchLogo} />
        ) : (
          ''
        )
      }
      size="sm"
      {...props.rest}
    >
      {props.text}
    </Button>
  );
}
