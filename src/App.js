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
import getAccountInfo from 'utils/auth/getAccountInfo';
import getAuthProvider from 'utils/auth/getAuthProvider';
import connectApi from 'utils/auth/connectApi';
import getStorage from 'utils/browser/getStorage';
import NavBar from 'features/navbar/NavBar';
import Chat from 'routes/root/Chat/Chat';
import Footer from 'components/Footer/Footer';
import Following from 'routes/Following/Following';
import Settings from 'routes/Settings/Settings';
// import clearStorage from 'utils/browser/clearStorage';
import Landing from 'routes/root/Landing/Landing';
import AboutUs from 'routes/AboutUs/AboutUs';
import PrivacyPolicy from 'routes/PrivacyPolicy/PrivacyPolicy';
import ReactGA from 'react-ga4';
import CookieConsentForm from 'components/CookieConsentForm/CookieConsentForm';

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

export default function App() {
  const [user, setUser] = useReducer(userReducer, userInit);
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
      const colorMode = localStorage.getItem('chakra-ui-color-mode');
      if (!colorMode || colorMode !== 'dark') {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        window.location.reload();
      }

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.height = '100%';
      document.body.style.width = '100%';
      window.addEventListener('resize', handleResize);

      let { accessToken, expiryTimestamp, userOptions, analyticsConsent } =
        getStorage();
      getUserOptions(userOptions);

      if (analyticsConsent === 'true') {
        ReactGA.initialize('G-NW3TF8XST3');
        ReactGA.send({ hitType: 'pageview' });
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
          <UserContext.Provider value={{ user, setUser }}>
            <Switch>
              <Route path="/about-us">
                <AboutUs />
              </Route>
              <Route path="/change-log">
                <Heading>Changelog</Heading>
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route path="/user-following">
                <Following loginLoading={loginLoading} />
              </Route>
              <Route path="/user-settings">
                <Settings />
              </Route>
              <Route path="/">
                {user.loggedIn || loginLoading ? <Chat /> : <Landing />}
              </Route>
            </Switch>
          </UserContext.Provider>
        </Container>
        <Footer />
        <CookieConsentForm />
      </Flex>
    </ChakraProvider>
  );
}
