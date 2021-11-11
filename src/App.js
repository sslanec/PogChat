// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Container, ChakraProvider, Flex } from '@chakra-ui/react';
import UserContext from 'context/User';
import getAccountInfo from 'utils/auth/getAccountInfo';
import getAuthProvider from 'utils/auth/getAuthProvider';
import connectApi from 'utils/auth/connectApi';
import getStorage from 'utils/browser/getStorage';
import NavBar from 'features/navbar/NavBar';
import Chat from 'routes/root/Chat';
// import Footer from 'components/Footer';
import Following from 'routes/Following';
import Settings from 'routes/Settings';
import Landing from 'routes/root/Landing';
import AboutUs from 'routes/AboutUs';
import PrivacyPolicy from 'routes/PrivacyPolicy';
import ReactGA4 from 'react-ga4';
import ReactGA from 'react-ga';
import CookieConsentForm from 'components/CookieConsentForm';
import { updateUser } from 'context/userSlice';
import theme from './theme';

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

export default function App() {
  const [user, setUser] = useReducer(userReducer, userInit);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loginLoading = useSelector(state => state.user.loginLoading);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const userOptions = useSelector(state => state.user.userOptions);
  const chatChannel = useSelector(state => state.user.chatChannel);

  const init = ({ apiClient, userAccInfo, globalBadges, userFollows }) => {
    if (location.pathname === '/') {
      navigate('/user-following');
    }
    setUser({ apiClient });
    dispatch(
      updateUser({
        userAccInfo,
        userFollows,
        globalBadges,
        followRefresh: Date.now(),
        loggedIn: true,
        loginLoading: false,
      })
    );
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
      setViewHeight(window.innerHeight);
    }, 50);

    if (mounted) {
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
        dispatch(updateUser({ loginLoading: true }));
        getAccountInfo(href).then(data => {
          user.authProvider = getAuthProvider(data['accessToken']);
          connectApi(user.authProvider).then(data => {
            init(data);
          });
        });
      } else if (expiryTimestamp > Date.now()) {
        dispatch(updateUser({ loginLoading: true }));
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
      <Flex flexDirection="column" height={viewHeight}>
        <NavBar />
        <Container
          display="flex"
          flexDirection="column"
          minHeight={0}
          paddingTop={2}
          paddingLeft={[3, 3, 0, 0]}
          paddingRight={[3, 3, 0, 0]}
          paddingBottom={2}
          flexGrow={1}
          overflow={
            location.pathname === '/' || location.pathname === '/' + chatChannel
              ? 'hidden'
              : 'auto'
          }
        >
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/user-following" element={<Following />} />
              <Route path="/user-settings" element={<Settings />} />
              <Route
                path="/*"
                element={loggedIn || loginLoading ? <Chat /> : <Landing />}
              />
            </Routes>
          </UserContext.Provider>
        </Container>
        {/* <Footer /> */}
        <CookieConsentForm />
      </Flex>
    </ChakraProvider>
  );
}
