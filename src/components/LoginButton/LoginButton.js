import clearStorage from '../../utils/browser/clearStorage';
import { Button } from '@chakra-ui/react';

function handleClick() {
  clearStorage();
  window.open(
    'https://id.twitch.tv/oauth2/authorize?' +
      `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
      `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&` +
      'response_type=id_token+code&' +
      'scope=openid+chat:read+chat:edit+user_read&' +
      'force_verify=true',
    '_self'
  );
}

export default function LoginButton(props) {
  return (
    <Button
      key={'LoginButton_' + props.text}
      onClick={handleClick}
      isLoading={props.isLoading}
      {...props.rest}
    >
      {props.text}
    </Button>
  );
}
