import { Box } from '@chakra-ui/react';

export default function ChatEmote(props) {
  return (
    <Box
      as="img"
      display="inline-block"
      height={props.height ? props.height : 6}
      width={props.width ? props.width : 'auto'}
      alt={props.name}
      title={props.name}
      src={props.src}
      {...props}
    />
  );
}
