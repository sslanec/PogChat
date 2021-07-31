import { Box } from '@chakra-ui/react';

export default function ChatEmote({ name, src }) {
  return (
    <Box
      as="img"
      display="inline-block"
      height="18px"
      width="auto"
      alt={name}
      title={name}
      src={src}
      paddingRight={'3px'}
    />
  );
}
