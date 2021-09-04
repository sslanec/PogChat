import { useEffect, useReducer, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import {
  Container,
  ChakraProvider,
  Flex,
  Heading,
  theme,
} from '@chakra-ui/react';
import UserContext from 'context/User/User';
import ChatContext from 'context/Chat/Chat';
import getAccountInfo from 'utils/auth/getAccountInfo';
import getAuthProvider from 'utils/auth/getAuthProvider';
import connectApi from 'utils/auth/connectApi';
import getStorage from 'utils/browser/getStorage';
import NavBar from 'features/navbar/NavBar';
import Chat from 'routes/root/Chat/Chat';
import ChatMessage from 'features/chat/ChatMessage';
import Footer from 'components/Footer/Footer';
import Following from 'routes/Following/Following';
import Settings from 'routes/Settings/Settings';
// import clearStorage from 'utils/browser/clearStorage';
import Landing from 'routes/root/Landing/Landing';

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
  emoteSets: null,
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
          // clrState[i]['ref'].current.remove();
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
  const history = useHistory();
  const location = useLocation();

  const init = ({ apiClient, userAccInfo, globalBadges, userFollows }) => {
    if (location.pathname === '/') {
      history.push('/user-following');
    }
    user.apiClient = apiClient;
    user.userAccInfo = userAccInfo;
    user.userFollows = userFollows;
    user.globalBadges = globalBadges;
    setUser({ followRefresh: Date.now() });
    setUser({ loggedIn: true });
    setDisplayName(user.userAccInfo.displayName);
    setAvatarUrl(user.userAccInfo.profilePictureUrl);
    setLoginLoading(false);
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
      document.body.style.height = '100%';
      document.body.style.width = '100%';
    }, 50);

    if (mounted) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.height = '100%';
      document.body.style.width = '100%';
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
        localStorage.setItem('accessToken', null);
        localStorage.setItem('expiryTimestamp', 0);
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
    <UserContext.Provider value={{ user, setUser }}>
      <ChakraProvider theme={theme}>
        <Flex
          flexDirection="column"
          height={dimensions.height}
          width={dimensions.width}
        >
          <NavBar
            avatarUrl={avatarUrl}
            displayName={displayName}
            loggedIn={loggedIn}
            loginLoading={loginLoading}
          />
          <Container
            display="flex"
            flexDirection="column"
            minHeight={0}
            paddingTop={2}
            paddingLeft={[2, 2, 0, 0]}
            paddingRight={[2, 2, 0, 0]}
            flexGrow={1}
          >
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
                <Following loginLoading={loginLoading} />
              </Route>
              <Route path="/user-settings">
                <Settings />
              </Route>
              <Route path="/">
                <ChatContext.Provider value={{ chats, setChats }}>
                  {user.loggedIn || loginLoading ? <Chat /> : <Landing />}
                </ChatContext.Provider>
              </Route>
            </Switch>
          </Container>
          <Footer />
        </Flex>
      </ChakraProvider>
    </UserContext.Provider>
  );
}
