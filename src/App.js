import { useEffect, useReducer, useRef, useState } from 'react';
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
import Following from './routes/Following/Following';
import Settings from './routes/Settings/Settings';
import clearStorage from './utils/browser/clearStorage';

const userInit = {
  userOptions: {
    badgeQuality: 3,
    emoteQuality: 3,
    usernameColors: true,
    chatTextSize: 'md',
  },
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
  followRefresh: null,
};

function debounce(func, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      func.apply(this, arguments);
    }, ms);
  };
}

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
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const scrollRef = useRef();

  const init = ({ apiClient, userAccInfo, globalBadges, userFollows }) => {
    user.apiClient = apiClient;
    user.userAccInfo = userAccInfo;
    user.globalBadges = globalBadges;
    user.userFollows = userFollows;
    setUser({ followRefresh: Date.now() });
    setUser({ loggedIn: true });
    setDisplayName(user.userAccInfo.displayName);
    setLoginLoading(false);
    setAvatarUrl(user.userAccInfo.profilePictureUrl);
    setLoggedIn(true);
  };

  const getUserOptions = async options => {
    if (options === null) {
      localStorage.setItem('userOptions', JSON.stringify(user.userOptions));
    } else {
      options = await JSON.parse(options);
      user.userOptions = options;
    }
  };

  useEffect(() => {
    let mounted = true;
    const handleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 50);

    if (mounted) {
      window.addEventListener('resize', handleResize);
      let { accessToken, expiryTimestamp, userOptions } = getStorage();
      getUserOptions(userOptions);

      const colorMode = localStorage.getItem('chakra-ui-color-mode');
      if (!colorMode || colorMode !== 'dark') {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        window.location.reload();
      }

      const href = document.location.href;
      const findToken = href.indexOf('code=');

      if (findToken > -1 && expiryTimestamp === '0') {
        setLoginLoading(true);
        getAccountInfo(href).then(data => {
          user.authProvider = getAuthProvider(data['accessToken']);
          connectApi(user.authProvider).then(data => {
            init(data);
          });
        });
      } else if (expiryTimestamp > Date.now()) {
        setLoginLoading(true);
        user.authProvider = getAuthProvider(accessToken);
        connectApi(user.authProvider).then(data => {
          init(data);
        });
      } else if (expiryTimestamp < Date.now()) {
        clearStorage();
      }
      // console.log(user);
    }
    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ChakraProvider theme={theme}>
          <Flex
            flexDirection="column"
            height={dimensions.height}
            width={dimensions.width}
            ref={scrollRef}
          >
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
                <Following flexGrow={1} />
              </Route>
              <Route path="/user-settings">
                <Settings flexGrow={1} />
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
