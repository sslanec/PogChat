const tmi = require('@twurple/auth-tmi');

export default function chatConnect(authProvider, channel) {
  const chatClient = new tmi.Client({
    // options: {
    //   debug: true,
    //   messagesLogLevel: 'info'
    // },
    connection: {
      reconnect: true,
      secure: true,
    },
    authProvider: authProvider,
    channels: [channel],
  });

  chatClient.connect().catch(console.error);

  return chatClient;
}
