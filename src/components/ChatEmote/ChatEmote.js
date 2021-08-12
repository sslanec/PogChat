import { Box } from '@chakra-ui/react';

export default function ChatEmote({ name, src }) {
  return (
    <Box
      as="img"
      display="inline-block"
      height={6}
      width="auto"
      alt={name}
      title={name}
      src={src}
    />
  );
}
