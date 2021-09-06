import { Flex, Heading, Text } from '@chakra-ui/react';

export default function PrivacyPolicy(props) {
  return (
    <Flex flex={[1, 1, '1px']} flexDirection="column" overflow="auto">
      <Heading>Privacy Policy</Heading>
      <Text paddingTop={2}>
        No information from your Twitch account is ever transmitted or used in
        any way outside of the PogChat application itself, including your email
        address and password. The access token received from Twitch upon logging
        in to your account only provides temporary and limited access to your
        account information. This token is saved only to your browser's local
        storage and is cleared upon expiration (up to four hours after receipt).
      </Text>
      <Text paddingTop={2}>
        This site uses Google Analytics for user count and basic demographic
        information. Your IP address is not collected. Users are free to decline
        this usage if desired and will be prompted once every 30 days for their
        continued consent or dissent. More information can be found in the{' '}
        <Text
          as="a"
          target="_blank"
          decoration="underline"
          href="https://marketingplatform.google.com/about/analytics/terms/us/"
        >
          Google Analytics Terms of Service
        </Text>
        .
      </Text>
    </Flex>
  );
}
