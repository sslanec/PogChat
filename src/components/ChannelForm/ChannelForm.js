import { createRef, useContext, useEffect, useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  // FormLabel,
  HStack,
} from '@chakra-ui/react';
import chatConnect from '../../utils/chat/chatConnect';
import UserContext from '../../context/User/User';
import ChatContext from '../../context/Chat/Chat';
import ChatMessage from '../ChatMessage/ChatMessage';
import SystemMessage from '../SystemMessage/SystemMessage';
import EventMessage from '../EventMessage/EventMessage';
import GiftMessage from '../GiftMessage/GiftMessage';
import getChannelBadges from '../../utils/api/getChannelBadges';
import getBTTVEmotes from '../../utils/api/getBTTVEmotes';
import getCheermotes from '../../utils/api/getCheermotes';
import getUserEmotes from '../../utils/api/getUserEmotes';
import followersOnly from '../../utils/chat/events/followersOnly';
import slowMode from '../../utils/chat/events/slowMode';
import emoteOnly from '../../utils/chat/events/emoteOnly';
import subsOnly from '../../utils/chat/events/subsOnly';
import timeoutHandler from '../../utils/chat/events/timeoutHandler';
import subHandler from '../../utils/chat/events/subHandler';
import subMysteryGift from '../../utils/chat/events/subMysteryGift';
import subGift from '../../utils/chat/events/subGift';
import resubHandler from '../../utils/chat/events/resubHandler';
import raidedHandler from '../../utils/chat/events/raidedHandler';
import hostingHandler from '../../utils/chat/events/hostingHandler';
import hostedHandler from '../../utils/chat/events/hostedHandler';
import getCheerList from '../../utils/chat/getCheerList';

const names = [
  'Kitboga',
  'Daniel_Dekay',
  'metalcomedy',
  'DashDucks',
  'JacksonATucker',
  'FoolishKia',
  'MikeLeonShreds',
  'Glostik_Willy',
  'MarysMilkMonsters',
  'BobRoss',
  'mikemenza_',
  'GrantTruesdellUTA',
  'TheSushiDragon',
  'moshtalks',
  'Beta64',
  'jonsmiff',
  'c0smikat',
  'ChrisDavisTGI',
  'Chainbrain',
  'tomthinks',
  'BlastBitMetalDrumming',
];

export default function ChannelInput(props) {
  const { user, setUser } = useContext(UserContext);
  const { setChats } = useContext(ChatContext);
  const [placeholder, setPlaceholder] = useState('');
  const [value, setValue] = useState('');
  const [emoteSets, setEmoteSets] = useState([]);
  const [loading, setLoading] = useState(false);

  const setChatEvents = async () => {
    user.chatClient.on(
      'anongiftpaidupgrade',
      (channel, username, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <EventMessage
                displayName={userstate['display-name']}
                msg=" is continuing their Gift Sub!"
                userstate={userstate}
              />
            ),
            channel: channel,
          },
        });
      }
    );

    // TODO: Figure this out
    user.chatClient.on('automod', (channel, msgid, message) => {
      // console.log(['automod', { msgid, message }]);
    });

    user.chatClient.on('ban', (channel, username, reason, userstate) => {
      setChats({
        type: 'ADD',
        item: {
          msg: <SystemMessage msg={`${username} has been banned.`} />,
        },
      });
    });

    // TODO: Fix this.
    user.chatClient.on('cheer', (channel, userstate, message) => {
      if (userstate['id']) {
        var id = userstate['id'];
      } else {
        id = message.split(' ').join('_');
      }

      if (userstate['message-type'] === 'action') {
        var isAction = true;
      } else {
        isAction = false;
      }

      if (userstate.bits > 1) {
        var bits = `(${userstate.bits} bits)`;
      } else {
        bits = '(1 bit)';
      }

      const ref = createRef();
      const cheerParse = user.cheermotes.parseMessage(message);
      const cheerList = getCheerList(cheerParse);

      setChats({
        type: 'ADD',
        item: {
          msg: (
            <ChatMessage
              bits={bits}
              bttvEmotes={user.bttvEmotes}
              channelBadges={user.channelBadges}
              cheerList={cheerList}
              displayName={userstate['display-name']}
              emoteQuality={user.userOptions.emoteQuality}
              globalBadges={user.globalBadges}
              isAction={isAction}
              msg={message}
              reference={ref}
              self={false}
              userstate={userstate}
            />
          ),
          id: id,
          ref: ref,
          channel: channel,
        },
      });
      // console.log([
      //   'cheerHandler',
      //   { userstate, message, cheerParse, cheerList },
      // ]);
    });

    user.chatClient.on('clearchat', channel => {
      setChats({ type: 'CLEAR', item: channel });
      setChats({
        type: 'ADD',
        item: {
          msg: <SystemMessage msg="Chat was cleared by a moderator." />,
        },
      });
    });

    user.chatClient.on('disconnected', reason => {
      if (reason) {
        setChats({
          type: 'ADD',
          item: {
            msg: <SystemMessage msg={reason} />,
          },
        });
      }
    });

    user.chatClient.on('emoteonly', (channel, enabled) => {
      setChats({
        type: 'ADD',
        item: { msg: <SystemMessage msg={emoteOnly(enabled)} /> },
      });
    });

    user.chatClient.on('emotesets', (sets, obj) => {
      if (sets) {
        var newSets = sets.split(',');
        if (newSets !== emoteSets) {
          setEmoteSets([]);
          for (var i in newSets) {
            emoteSets.push(newSets[i]);
          }
        }
        // console.log({ sets, emoteSets });
      }
    });

    user.chatClient.on('followersonly', (channel, enabled, length) => {
      setChats({
        type: 'ADD',
        item: {
          msg: <SystemMessage msg={followersOnly(enabled, length)} />,
        },
      });
    });

    user.chatClient.on(
      'giftpaidupgrade',
      (channel, username, sender, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <GiftMessage
                displayName={userstate['display-name']}
                msg=" is continuing their Gift Sub from "
                recipient={sender}
              />
            ),
            channel: channel,
          },
        });
      }
    );

    user.chatClient.on('globaluserstate', userstate => {
      // console.log(['globaluserstate', { userstate }]);
    });

    user.chatClient.on('hosted', (channel, username, viewers, autohost) => {
      setChats({
        type: 'ADD',
        item: {
          msg: (
            <EventMessage
              displayName={username}
              msg={hostedHandler(viewers, autohost)}
            />
          ),
          channel: channel,
        },
      });
    });

    user.chatClient.on('hosting', (channel, target, viewers) => {
      setChats({
        type: 'ADD',
        item: {
          msg: <SystemMessage msg={hostingHandler(target, viewers)} />,
        },
      });
    });

    user.chatClient.on('message', (channel, userstate, message, self) => {
      const ref = createRef();

      if (userstate['id']) {
        var id = userstate['id'];
      } else {
        id = message.split(' ').join('_');
      }

      if (userstate['message-type'] === 'action') {
        var isAction = true;
      } else {
        isAction = false;
      }

      if (user.connected) {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <ChatMessage
                bits={false}
                bttvEmotes={user.bttvEmotes}
                channelBadges={user.channelBadges}
                displayName={userstate['display-name']}
                emoteQuality={user.userOptions.emoteQuality}
                globalBadges={user.globalBadges}
                isAction={isAction}
                msg={message}
                reference={ref}
                self={self}
                userstate={userstate}
                userEmotes={self ? user.userEmotes : ''}
              />
            ),
            id: id,
            ref: ref,
            channel: channel,
          },
        });
        // console.log({ userstate, message, self, ref });
      }
    });

    user.chatClient.on(
      'messagedeleted',
      (channel, username, deletedMessage, userstate) => {
        // console.log([
        //   'messageDeleted',
        //   {
        //     username,
        //     deletedMessage,
        //     userstate,
        //   },
        // ]);
        if (username !== user.userAccInfo.name) {
          setChats({ type: 'DELETE', item: userstate['target-msg-id'] });
        } else {
          setChats({
            type: 'DELETE',
            item: deletedMessage.split(' ').join('_'),
          });
        }
      }
    );

    user.chatClient.on('notice', (channel, msgid, message) => {
      setChats({
        type: 'ADD',
        item: { msg: <SystemMessage msg={message} /> },
      });
    });

    //TODO: Finish this
    user.chatClient.on(
      'primepaidupgrade',
      (channel, username, methods, userstate) => {
        // console.log(['primepaidupgrade', { username, methods, userstate }]);
      }
    );

    user.chatClient.on('raided', (channel, username, viewers, tags) => {
      // console.log(['raided', { username, viewers, tags }]);
      setChats({
        type: 'ADD',
        item: {
          msg: (
            <EventMessage displayName={username} msg={raidedHandler(viewers)} />
          ),
          channel: channel,
        },
      });
    });

    // TODO: Finish this
    user.chatClient.on('redeem', (channel, username, rewardType, userstate) => {
      // console.log(['redeem', { channel, username, rewardType, userstate }]);
    });

    user.chatClient.on(
      'resub',
      (channel, username, streakMonths, message, userstate, methods) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <EventMessage
                displayName={userstate['display-name']}
                msg={resubHandler(streakMonths, userstate, methods)}
                userstate={userstate}
              />
            ),
            channel: channel,
          },
        });
        if (message) {
          if (userstate['id']) {
            var id = userstate['id'];
          } else {
            id = message.split(' ').join('_');
          }
          const ref = createRef();
          setChats({
            type: 'ADD',
            item: {
              msg: (
                <ChatMessage
                  bits={false}
                  bttvEmotes={user.bttvEmotes}
                  channelBadges={user.channelBadges}
                  displayName={userstate['display-name']}
                  emoteQuality={user.userOptions.emoteQuality}
                  globalBadges={user.globalBadges}
                  isAction={false}
                  msg={message}
                  reference={ref}
                  self={false}
                  userstate={userstate}
                />
              ),
              id: id,
              ref: ref,
              channel: channel,
            },
          });
        }
      }
    );

    user.chatClient.on('roomstate', async (channel, state) => {
      if (user.connected === false) {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <SystemMessage msg={`Connected to ${user.chatChannel}'s chat.`} />
            ),
          },
        });
        if (state['emote-only']) {
          setChats({
            type: 'ADD',
            item: { msg: <SystemMessage message={emoteOnly(true)} /> },
          });
        }
        if (state['followers-only'] === false) {
          setChats({
            type: 'ADD',
            item: { msg: <SystemMessage msg={followersOnly(true, 0)} /> },
          });
        } else if (state['followers-only'] === true) {
          setChats({
            type: 'ADD',
            item: { msg: <SystemMessage msg={followersOnly(true, 1)} /> },
          });
        } else if (state['followers-only'] > -1) {
          setChats({
            type: 'ADD',
            item: {
              msg: (
                <SystemMessage
                  msg={followersOnly(true, state['followers-only'])}
                />
              ),
            },
          });
        }
        if (state['slow'] === true) {
          setChats({
            type: 'ADD',
            item: { msg: <SystemMessage msg={slowMode(true, 1)} /> },
          });
        } else if (state['slow'] > 1) {
          setChats({
            type: 'ADD',
            item: {
              msg: <SystemMessage msg={slowMode(true, state['slow'])} />,
            },
          });
        }
        if (state['subs-only']) {
          setChats({
            type: 'ADD',
            item: { msg: <SystemMessage msg={subsOnly(true)} /> },
          });
        }

        user.roomstate = state;
        user.bttvEmotes = await getBTTVEmotes(state['room-id']);
        setUser({ bttvEmotes: user.bttvEmotes });
        user.channelBadges = await getChannelBadges(
          user.apiClient,
          state['room-id']
        );
        user.cheermotes = await getCheermotes(user.apiClient, state['room-id']);
        setUser({ connected: true });
        user.connected = true;

        localStorage.setItem('lastChannel', [
          user.chatChannel,
          state['room-id'],
        ]);

        // console.log({ state, user });
      }
      if (emoteSets.length > 0) {
        let { emotes, sets } = await getUserEmotes(user.apiClient, emoteSets);
        user.userEmotes = emotes;
        setUser({ userEmotes: user.userEmotes });
        setUser({ emoteSets: sets });
        // console.log({ userEmotes: user.userEmotes });
      }
      setLoading(false);
    });

    user.chatClient.on('slowmode', (channel, enabled, length) => {
      setChats({
        type: 'ADD',
        item: { msg: <SystemMessage msg={slowMode(enabled, length)} /> },
      });
    });

    // TODO: Finish this
    user.chatClient.on(
      'subgift',
      (channel, username, streakMonths, recipient, methods, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <GiftMessage
                displayName={userstate['display-name']}
                msg={subGift(streakMonths, methods)}
                recipient={recipient}
              />
            ),
            channel: channel,
          },
        });
        // console.log([
        //   'subGift',
        //   { username, streakMonths, recipient, methods, userstate },
        // ]);
      }
    );

    user.chatClient.on(
      'submysterygift',
      (channel, username, numOfSubs, methods, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <EventMessage
                displayName={userstate['display-name']}
                msg={subMysteryGift(numOfSubs, methods, userstate)}
                userstate={userstate}
              />
            ),
            channel: channel,
          },
        });
      }
    );

    user.chatClient.on('subscribers', (channel, enabled) => {
      setChats({
        type: 'ADD',
        item: { msg: <SystemMessage msg={subsOnly(enabled)} /> },
      });
    });

    user.chatClient.on(
      'subscription',
      (channel, username, method, message, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <EventMessage
                displayName={userstate['display-name']}
                msg={subHandler(method)}
                userstate={userstate}
              />
            ),
            channel: channel,
          },
        });
        if (message) {
          if (userstate['id']) {
            var id = userstate['id'];
          } else {
            id = message.split(' ').join('_');
          }
          const ref = createRef();
          setChats({
            type: 'ADD',
            item: {
              msg: (
                <ChatMessage
                  bits={false}
                  bttvEmotes={user.bttvEmotes}
                  channelBadges={user.channelBadges}
                  displayName={userstate['display-name']}
                  emoteQuality={user.userOptions.emoteQuality}
                  globalBadges={user.globalBadges}
                  isAction={false}
                  msg={message}
                  reference={ref}
                  self={false}
                  userstate={userstate}
                />
              ),
              id: id,
              ref: ref,
              channel: channel,
            },
          });
        }
      }
    );

    user.chatClient.on(
      'timeout',
      (channel, username, reason, duration, userstate) => {
        setChats({
          type: 'ADD',
          item: {
            msg: (
              <EventMessage
                displayName={username}
                msg={timeoutHandler(duration)}
                userstate={userstate}
              />
            ),
            channel: channel,
          },
        });
      }
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (user.chatChannel) {
        setValue(user.chatChannel);
      }
      setPlaceholder(`${names[Math.floor(Math.random() * names.length)]}`);
      if (window.location.pathname !== '/' && user.loggedIn) {
        if (user.connected) {
          user.chatClient.disconnect().then(() => {
            setUser({ connected: false });
            user.connected = false;
          });
        }
        setLoading(true);
        user.chatChannel = window.location.pathname.substring(1);
        setValue(window.location.pathname.substring(1));
        user.chatClient = chatConnect(
          user.authProvider,
          window.location.pathname.substring(1)
        );
        user.chatChannel = window.location.pathname.substring(1);
        setChatEvents();
      }
    }
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  const handleChange = event => {
    user.chatChannel = event.target.value;
    setValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (user.connected) {
      user.chatClient.disconnect();
      setUser({ connected: false });
      window.history.replaceState({}, document.title, '/');
    } else {
      setLoading(true);
      user.chatClient = chatConnect(user.authProvider, value);
      window.history.replaceState({}, document.title, '/' + value);
      // user.chatChannel = value;
      setChatEvents();
    }
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit} {...props}>
      <HStack>
        {/* <FormLabel>Channel:</FormLabel> */}
        <Input
          disabled={!user.loggedIn || user.connected || loading}
          onChange={handleChange}
          placeholder={'Channel (Ex: ' + placeholder + ')'}
          value={value}
        />
        <Button
          disabled={!user.loggedIn || loading || value === ''}
          isLoading={loading}
          type="submit"
          variant="outline"
        >
          {user.connected ? 'Disconnect' : 'Connect'}
        </Button>
      </HStack>
    </FormControl>
  );
}
