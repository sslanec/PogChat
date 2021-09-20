import { useContext, useEffect, useState } from 'react';
import { Input, Button, FormControl, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import chatConnect from 'utils/chat/chatConnect';
import UserContext from 'context/User/User';
import getChannelBadges from 'utils/api/getChannelBadges';
import getBTTVEmotes from 'utils/api/getBTTVEmotes';
import getUserEmotes from 'utils/api/getUserEmotes';
import followersOnly from 'utils/chat/events/followersOnly';
import slowMode from 'utils/chat/events/slowMode';
import emoteOnly from 'utils/chat/events/emoteOnly';
import subsOnly from 'utils/chat/events/subsOnly';
import timeoutHandler from 'utils/chat/events/timeoutHandler';
import subHandler from 'utils/chat/events/subHandler';
import subMysteryGift from 'utils/chat/events/subMysteryGift';
import subGift from 'utils/chat/events/subGift';
import resubHandler from 'utils/chat/events/resubHandler';
import raidedHandler from 'utils/chat/events/raidedHandler';
import hostingHandler from 'utils/chat/events/hostingHandler';
import hostedHandler from 'utils/chat/events/hostedHandler';
import getCheerList from 'utils/chat/getCheerList';
import {
  addMessage,
  clearMessages,
  deleteMessage,
} from 'features/chat/chatSlice';
import { updateUser } from 'features/userSlice';
import store from 'store';

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

export default function ChannelInput() {
  const { user, setUser } = useContext(UserContext);
  const [placeholder, setPlaceholder] = useState('');
  const [value, setValue] = useState('');
  const [emoteSets, setEmoteSets] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const connected = useSelector(state => state.user.connected);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const chatChannel = useSelector(state => state.user.chatChannel);
  const userAccInfo = useSelector(state => state.user.userAccInfo);

  const setChatEvents = async () => {
    user.chatClient.on(
      'anongiftpaidupgrade',
      (channel, username, userstate) => {
        dispatch(
          addMessage({
            msg: ' is continuing their Gift Sub!',
            msgType: 'event',
            userstate,
            displayName: userstate['display-name'],
            channel,
          })
        );
      }
    );

    // TODO: Test, implement if useful.
    user.chatClient.on('automod', (channel, msgid, message) => {
      // console.log(['automod', { msgid, message }]);
    });

    user.chatClient.on('ban', (channel, username, reason, userstate) => {
      dispatch(
        addMessage({
          msg: `${username} has been banned.`,
          msgType: 'system',
          userstate,
          reason,
          channel,
        })
      );
    });

    // TODO: Test, fix if needed.
    user.chatClient.on('cheer', (channel, userstate, message) => {
      if (userstate['id']) {
        var id = userstate['id'];
      } else {
        id = message.split(' ').join('_');
      }

      if (userstate.bits > 1) {
        var bits = `(${userstate.bits} bits)`;
      } else {
        bits = '(1 bit)';
      }

      const cheerParse = user.cheermotes.parseMessage(message);
      const cheerList = getCheerList(cheerParse);

      dispatch(
        addMessage({
          msg: message,
          msgType: 'chat',
          id,
          bits,
          userstate,
          channel,
          cheerList,
        })
      );
      // console.log([
      //   'cheerHandler',
      //   { userstate, message, cheerParse, cheerList },
      // ]);
    });

    user.chatClient.on('clearchat', channel => {
      dispatch(clearMessages(channel));
      dispatch(
        addMessage({
          msg: 'Chat was cleared by a moderator.',
          msgType: 'system',
          channel,
        })
      );
    });

    user.chatClient.on('disconnected', reason => {
      if (reason) {
        dispatch(addMessage({ msg: reason, msgType: 'system' }));
      }
    });

    user.chatClient.on('emoteonly', (channel, enabled) => {
      dispatch(
        addMessage({ msg: emoteOnly(enabled), msgType: 'system', channel })
      );
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
      dispatch(
        addMessage({
          msg: followersOnly(enabled, length),
          msgType: 'system',
          channel,
        })
      );
    });

    user.chatClient.on(
      'giftpaidupgrade',
      (channel, username, sender, userstate) => {
        dispatch(
          addMessage({
            msg: ' is continuing their Gift Sub from ',
            msgType: 'gift',
            displayName: userstate['display-name'],
            recipient: sender,
            channel,
          })
        );
      }
    );

    user.chatClient.on('globaluserstate', userstate => {
      // console.log(['globaluserstate', { userstate }]);
    });

    user.chatClient.on('hosted', (channel, username, viewers, autohost) => {
      dispatch(
        addMessage({
          msg: hostedHandler(viewers, autohost),
          displayName: username,
          channel,
        })
      );
    });

    user.chatClient.on('hosting', (channel, target, viewers) => {
      dispatch(
        addMessage({ msg: hostingHandler(target, viewers), msgType: 'system' })
      );
    });

    user.chatClient.on('message', (channel, userstate, message, self) => {
      // console.log({ userstate });
      const state = store.getState();
      if (state.user.connected === true) {
        if (userstate['id']) {
          var id = userstate['id'];
        } else {
          id = message.split(' ').join('_');
        }

        dispatch(
          addMessage({
            bits: false,
            channel,
            id,
            msg: message,
            msgType: 'chat',
            self,
            userstate,
          })
        );
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
        if (username !== userAccInfo.name) {
          dispatch(deleteMessage(userstate['target-msg-id']));
        } else {
          dispatch(deleteMessage(deletedMessage.split(' ').join('_')));
        }
      }
    );

    user.chatClient.on('notice', (channel, msgid, message) => {
      dispatch(addMessage({ msg: message, msgid, msgType: 'system', channel }));
    });

    //TODO: Finish this
    user.chatClient.on(
      'primepaidupgrade',
      (channel, username, methods, userstate) => {
        // console.log(['primepaidupgrade', { username, methods, userstate }]);
      }
    );

    user.chatClient.on('raided', (channel, username, viewers, tags) => {
      dispatch(
        addMessage({
          msg: raidedHandler(viewers),
          msgType: 'event',
          displayName: username,
          channel,
        })
      );
    });

    // TODO: Finish this
    user.chatClient.on('redeem', (channel, username, rewardType, userstate) => {
      // console.log(['redeem', { channel, username, rewardType, userstate }]);
    });

    user.chatClient.on(
      'resub',
      (channel, username, streakMonths, message, userstate, methods) => {
        dispatch(
          addMessage({
            msg: resubHandler(streakMonths, userstate, methods),
            msgType: 'event',
            displayName: userstate['display-name'],
            userstate,
            channel,
          })
        );

        if (message) {
          if (userstate['id']) {
            var id = userstate['id'];
          } else {
            id = message.split(' ').join('_');
          }

          dispatch(
            addMessage({
              msg: message,
              msgType: 'chat',
              userstate,
              channel,
              id,
            })
          );
        }
      }
    );

    user.chatClient.on('roomstate', async (channel, state) => {
      if (connected === false) {
        dispatch(
          addMessage({
            msg: `Connected to ${chatChannel}'s chat.`,
            msgType: 'system',
          })
        );
        if (state['emote-only']) {
          dispatch(
            addMessage({
              msg: emoteOnly(true),
              msgType: 'system',
            })
          );
        }
        if (state['followers-only'] === false) {
          dispatch(
            addMessage({
              msg: followersOnly(true, 0),
              msgType: 'system',
            })
          );
        } else if (state['followers-only'] === true) {
          dispatch(
            addMessage({
              msg: followersOnly(true, 1),
              msgType: 'system',
            })
          );
        } else if (state['followers-only'] > -1) {
          dispatch(
            addMessage({
              msg: followersOnly(true, state['followers-only']),
              msgType: 'system',
            })
          );
        }
        if (state['slow'] === true) {
          dispatch(
            addMessage({
              msg: slowMode(true, 1),
              msgType: 'system',
            })
          );
        } else if (state['slow'] > 1) {
          dispatch(
            addMessage({
              msg: slowMode(true, state['slow']),
              msgType: 'system',
            })
          );
        }
        if (state['subs-only']) {
          dispatch(
            addMessage({
              msg: subsOnly(true),
              msgType: 'system',
            })
          );
        }

        const bttvEmotes = await getBTTVEmotes(state['room-id']);
        const channelBadges = await getChannelBadges(
          user.apiClient,
          state['room-id']
        );
        const newCheermotes = await user.apiClient.helix.bits.getCheermotes(
          state['room-id']
        );
        user.cheermotes = newCheermotes;
        setUser({ cheermotes: newCheermotes });

        localStorage.setItem('lastChannel', [chatChannel, state['room-id']]);

        dispatch(
          updateUser({
            connected: true,
            roomstate: state,
            bttvEmotes,
            channelBadges,
          })
        );
      }

      if (emoteSets.length > 0) {
        let { emotes, sets } = await getUserEmotes(user.apiClient, emoteSets);

        dispatch(updateUser({ userEmotes: emotes, emoteSets: sets }));
      }
      setLoading(false);
    });

    user.chatClient.on('slowmode', (channel, enabled, length) => {
      dispatch(
        addMessage({
          msg: slowMode(enabled, length),
          msgType: 'system',
          channel,
        })
      );
    });

    // TODO: Finish this
    user.chatClient.on(
      'subgift',
      (channel, username, streakMonths, recipient, methods, userstate) => {
        dispatch(
          addMessage({
            msg: subGift(streakMonths, methods),
            msgType: 'gift',
            displayName: userstate['display-name'],
            recipient,
            userstate,
            channel,
          })
        );
        // console.log([
        //   'subGift',
        //   { username, streakMonths, recipient, methods, userstate },
        // ]);
      }
    );

    user.chatClient.on(
      'submysterygift',
      (channel, username, numOfSubs, methods, userstate) => {
        dispatch(
          addMessage({
            msg: subMysteryGift(numOfSubs, methods, userstate),
            msgType: 'event',
            displayName: userstate['display-name'],
            userstate,
            channel,
          })
        );
      }
    );

    user.chatClient.on('subscribers', (channel, enabled) => {
      dispatch(
        addMessage({
          msg: subsOnly(enabled),
          msgType: 'system',
          channel,
        })
      );
    });

    user.chatClient.on(
      'subscription',
      (channel, username, method, message, userstate) => {
        dispatch(
          addMessage({
            msg: subHandler(method),
            msgType: 'event',
            displayName: userstate['display-name'],
            userstate,
            channel,
          })
        );

        if (message) {
          if (userstate['id']) {
            var id = userstate['id'];
          } else {
            id = message.split(' ').join('_');
          }

          dispatch(
            addMessage({
              bits: false,
              channel,
              id,
              msg: message,
              msgType: 'chat',
              self: false,
              userstate,
            })
          );
        }
      }
    );

    user.chatClient.on(
      'timeout',
      (channel, username, reason, duration, userstate) => {
        dispatch(
          addMessage({
            msg: timeoutHandler(duration),
            msgType: 'event',
            displayName: username,
            userstate,
            channel,
            reason,
          })
        );
      }
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (chatChannel) {
        setValue(chatChannel);
      }
      setPlaceholder(`${names[Math.floor(Math.random() * names.length)]}`);
      if (window.location.pathname !== '/' && loggedIn) {
        if (connected === true) {
          user.chatClient.disconnect().then(() => {
            dispatch(updateUser({ connected: false }));
          });
        }
        setLoading(true);
        setValue(window.location.pathname.substring(1));
        dispatch(
          updateUser({ chatChannel: window.location.pathname.substring(1) })
        );

        user.chatClient = chatConnect(
          user.authProvider,
          window.location.pathname.substring(1)
        );

        setChatEvents();
      }
    }
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (connected === true) {
      user.chatClient.disconnect();
      dispatch(updateUser({ connected: false }));
      window.history.replaceState({}, document.title, '/');
    } else {
      setLoading(true);
      user.chatClient = chatConnect(user.authProvider, value);
      window.history.replaceState({}, document.title, '/' + value);
      dispatch(updateUser({ chatChannel: value }));
      setChatEvents();
    }
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit}>
      <HStack>
        {/* <FormLabel>Channel:</FormLabel> */}
        <Input
          disabled={!loggedIn || connected || loading}
          onChange={handleChange}
          placeholder={'Channel (Ex: ' + placeholder + ')'}
          value={value}
        />
        <Button
          disabled={!loggedIn || loading || value === ''}
          isLoading={loading}
          type="submit"
          variant="outline"
        >
          {connected ? 'Disconnect' : 'Connect'}
        </Button>
      </HStack>
    </FormControl>
  );
}
