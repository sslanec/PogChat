import { Container, Heading, HStack, Text } from '@chakra-ui/react';
import ChatEmote from '../ChatEmote/ChatEmote';

export default function Landing(props) {
  const url =
    'https://id.twitch.tv/oauth2/authorize?' +
    `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
    `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&` +
    'response_type=id_token+code&' +
    'scope=openid+chat:read+chat:edit+user:read:follows&' +
    'force_verify=true';

  return (
    <Container
      display="flex"
      flexDirection="column"
      minHeight={0}
      paddingTop={2}
      paddingLeft={2}
      paddingRight={2}
      {...props}
    >
      <Heading>Welcome to PogChat</Heading>
      <Heading size="md">A web-based Twitch chat alternative</Heading>

      <Heading size="sm" paddingTop={6}>
        Popular community features included
      </Heading>
      <Text paddingTop={2}>
        Show your hype however you like with BetterTTV and FrankerFaceZ emotes.
      </Text>

      <HStack spacing="auto" paddingTop={2}>
        <ChatEmote
          src="https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x"
          name="catJAM"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/5b444de56b9160327d12534a/3x"
          name="pepeDS"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/5ea831f074046462f768097a/3x"
          name="KEKW"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/608f8cb439b5010444d0aaf2/3x"
          name="dekayDRUM"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/5d38aaa592fc550c2d5996b8/3x"
          name="peepoClap"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/60259d6dd47a0b2db8d1a66d/3x"
          name="DanceShake"
          height={7}
        />
        <ChatEmote
          src="https://cdn.betterttv.net/emote/5b6c5efadd8fb0185163bd4f/3x"
          name="BoneZone"
          height={7}
        />
      </HStack>

      <Heading size="sm" paddingTop={6}>
        Optimized for mobile use
      </Heading>
      <Text paddingTop={2}>
        Chat anywhere. PogChat is built mobile-first to enhance your Twitch
        chatting experience wherever you go.
      </Text>

      <Heading size="md" paddingTop={6}>
        <Text as="a" href={url} textDecoration="underline">
          Log in
        </Text>{' '}
        with your Twitch account to get started!
      </Heading>
    </Container>
  );
}
