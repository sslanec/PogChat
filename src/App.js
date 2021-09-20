import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Landing from 'routes/root/Landing/Landing';
import AboutUs from 'routes/AboutUs/AboutUs';
import PrivacyPolicy from 'routes/PrivacyPolicy/PrivacyPolicy';
import ReactGA4 from 'react-ga4';
import ReactGA from 'react-ga';
import CookieConsentForm from 'components/CookieConsentForm/CookieConsentForm';
import { updateUser } from 'features/userSlice';

const userInit = {
  authProvider: null,
  apiClient: null,
  chatClient: null,
  cheermotes: null,
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

// function chatReducer(state, { type, item }) {
//   switch (type) {
//     case 'ADD':
//       return [...state, item];
//     case 'CLEAR':
//       let clrState = state;
//       for (let i = clrState.length - 1; i > 0; i--) {
//         if (clrState[i]['channel'] === item) {
//           // clrState[i]['ref'].current.remove();
//           clrState.splice(i, 1);
//         }
//       }
//       return clrState;
//     case 'DELETE':
//       let delState = state;
//       let deleted = false;
//       let i = delState.length - 1;
//       while (!deleted) {
//         if (delState[i]['id'] === item) {
//           let delMsg = delState[i]['ref'].current.innerHTML.split(': ');
//           delMsg[1] = '< message deleted >';
//           delState[i]['ref'].current.innerHTML = delMsg.join(': ');
//           delState[i] = {
//             msg: (
//               <ChatMessage
//                 displayName={delState[i]['msg']['props']['displayName']}
//                 msg="< message deleted >"
//                 userstate={delState[i]['msg']['props']['userstate']}
//                 reference={delState[i]['msg']['props']['reference']}
//               />
//             ),
//             id: delState[i]['id'],
//             ref: delState[i]['ref'],
//             channel: delState[i]['channel'],
//           };
//           deleted = true;
//         }
//         i--;
//       }
//       return delState;
//     default:
//       return state;
//   }
// }

export default function App() {
  const [user, setUser] = useReducer(userReducer, userInit);
  const [displayName, setDisplayName] = useState('Login');
  const [loginLoading, setLoginLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const userOptions = useSelector(state => state.user.userOptions);

  const init = ({ apiClient, userAccInfo, globalBadges, userFollows }) => {
    if (location.pathname === '/') {
      history.push('/user-following');
    }

    user.apiClient = apiClient;
    setUser({ apiClient });

    dispatch(
      updateUser({
        userAccInfo,
        userFollows,
        globalBadges,
        followRefresh: Date.now(),
        loggedIn: true,
      })
    );

    setDisplayName(userAccInfo.displayName);
    setAvatarUrl(userAccInfo.profilePictureUrl);
    setLoginLoading(false);
  };

  const getUserOptions = async options => {
    if (options === null) {
      localStorage.setItem('userOptions', JSON.stringify(userOptions));
    } else {
      options = await JSON.parse(options);
      dispatch(updateUser({ userOptions: options }));
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
      // Switch to dark mode automatically
      const colorMode = localStorage.getItem('chakra-ui-color-mode');
      if (!colorMode || colorMode !== 'dark') {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        window.location.reload();
      }

      // Styling to prevent page scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.height = '100%';
      document.body.style.width = '100%';
      window.addEventListener('resize', handleResize);

      let { accessToken, expiryTimestamp, userOptions, analyticsConsent } =
        getStorage();
      getUserOptions(userOptions);

      if (analyticsConsent === 'true') {
        ReactGA4.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_GA4);
        ReactGA4.send({ hitType: 'pageview' });
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_UA);
        ReactGA.pageview(window.location.pathname);
      }

      // Check for OAuth login code
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
                {loggedIn || loginLoading ? <Chat /> : <Landing />}
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
