import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

export default function MenuItem(props) {
  return (
    <Link to={props.to}>
      <Text display="block" onClick={props.toggle} {...props.rest}>
        {props.children}
      </Text>
    </Link>
  );
}
