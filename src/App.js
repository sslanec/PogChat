import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChakraProvider, Flex, Heading, theme } from '@chakra-ui/react';
import UserContext from './context/User/User';
import ChatContext from './context/Chat/Chat';
import getAccountInfo from './utils/auth/getAccountInfo';
import getAuthProvider from './utils/auth/getAuthProvider';
import connectApi from './utils/auth/connectApi';
import getStorage from './utils/browser/getStorage';
import NavBar from './components/NavBar/NavBar';
import Chat from './routes/Chat/Chat';
import ChatMessage from './components/ChatMessage/ChatMessage';
import Footer from './components/Footer/Footer';

const userInit = {
  userOptions: {
    badgeQuality: 3,
    emoteQuality: 3,
    usernameColors: false,
  },
  accessToken: null,
  connected: false,
  authProvider: null,
  apiClient: null,
  chatClient: null,
  chatChannel: null,
  roomstate: null,
  userAccInfo: null,
  bttvEmotes: null,
  userEmotes: null,
  channelBadges: null,
  globalBadges: null,
  cheermotes: null,
  loggedIn: false,
  userFollows: null,
};

function userReducer(state, item) {
  return { ...state, ...item };
}

function chatReducer(state, { type, item }) {
  switch (type) {
    case 'ADD':
      return [...state, item];
    case 'CLEAR':
      let clrState = state;
      for (let i = clrState.length - 1; i > 0; i--) {
        if (clrState[i]['channel'] === item) {
          clrState[i]['ref'].current.remove();
          clrState.splice(i, 1);
        }
      }
      return clrState;
    case 'DELETE':
      let delState = state;
      let deleted = false;
      let i = delState.length - 1;
      while (!deleted) {
        if (delState[i]['id'] === item) {
          let delMsg = delState[i]['ref'].current.innerHTML.split(': ');
          delMsg[1] = '< message deleted >';
          delState[i]['ref'].current.innerHTML = delMsg.join(': ');
          delState[i] = {
            msg: (
              <ChatMessage
                displayName={delState[i]['msg']['props']['displayName']}
                msg="< message deleted >"
                userstate={delState[i]['msg']['props']['userstate']}
                reference={delState[i]['msg']['props']['reference']}
              />
            ),
            id: delState[i]['id'],
            ref: delState[i]['ref'],
            channel: delState[i]['channel'],
          };
          deleted = true;
        }
        i--;
      }
      return delState;
    default:
      return state;
  }
}

export default function App() {
  const [user, setUser] = useReducer(userReducer, userInit);
  const [chats, setChats] = useReducer(chatReducer, []);
  const [displayName, setDisplayName] = useState('Login');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  function init({ apiClient, userAccInfo, globalBadges, userFollows }) {
    user.apiClient = apiClient;
    user.userAccInfo = userAccInfo;
    user.globalBadges = globalBadges;
    user.userFollows = userFollows;
    setUser({ loggedIn: true });
    setDisplayName(user.userAccInfo.displayName);
    setLoginLoading(false);
    setAvatarUrl(user.userAccInfo.profilePictureUrl);
    setLoggedIn(true);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const colorMode = localStorage.getItem('chakra-ui-color-mode');
      if (!colorMode || colorMode !== 'dark') {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        window.location.reload();
      }

      const href = document.location.href;
      const findToken = href.indexOf('code=');
      let { accessToken, refreshToken, expiryTimestamp } = getStorage();

      if (findToken > -1 && expiryTimestamp === '0') {
        setLoginLoading(true);
        getAccountInfo(href).then(data => {
          user.accessToken = data['accessToken'];
          user.authProvider = getAuthProvider(
            data['accessToken'],
            data['refreshToken'],
            data['expiryTimestamp']
          );
          connectApi(user.authProvider).then(data => {
            init(data);
          });
          // console.log({ user });
        });
      }

      if (expiryTimestamp > 0) {
        setLoginLoading(true);
        user.accessToken = accessToken;
        user.authProvider = getAuthProvider(
          accessToken,
          refreshToken,
          expiryTimestamp
        );
        connectApi(user.authProvider).then(data => {
          init(data);
        });
        // console.log({ user });
      }
    }
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ChakraProvider theme={theme}>
          <Flex flexDirection="column" height="100vh" maxHeight="100vh">
            <NavBar
              avatarUrl={avatarUrl}
              displayName={displayName}
              loggedIn={loggedIn}
              loginLoading={loginLoading}
            />
            <Switch>
              <Route path="/about-us">
                <Heading>About Us</Heading>
              </Route>
              <Route path="/change-log">
                <Heading>Changelog</Heading>
              </Route>
              <Route path="/privacy-policy">
                <Heading>Privacy Policy</Heading>
              </Route>
              <Route path="/user-following">
                <Heading>Following</Heading>
              </Route>
              <Route path="/user-settings">
                <Heading>Settings</Heading>
              </Route>
              <Route path="/">
                <ChatContext.Provider value={{ chats, setChats }}>
                  <Chat flexGrow={1} />
                </ChatContext.Provider>
              </Route>
            </Switch>
            <Footer />
          </Flex>
        </ChakraProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
