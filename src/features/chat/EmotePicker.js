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

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  // PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import ChatEmote from 'features/chat/ChatEmote';

export default function EmotePicker({ insertEmote }) {
  const [showBTTVShared, setShowBTTVShared] = useState(false);
  const [showBTTVChannel, setShowBTTVChannel] = useState(false);
  const [showFFZChannel, setShowFFZChannel] = useState(false);
  const [showEmotes, setShowEmotes] = useState(false);
  const emoteSets = useRef();

  const bttvEmotes = useSelector(state => state.user.bttvEmotes);
  const userEmoteSets = useSelector(state => state.user.emoteSets);
  const userOptions = useSelector(state => state.user.userOptions);
  const userEmotes = useSelector(state => state.user.userEmotes);
  const connected = useSelector(state => state.user.connected);
  const loggedIn = useSelector(state => state.user.loggedIn);

  const onClickHandler = key => {
    insertEmote(key);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (bttvEmotes) {
        let i = Object.keys(bttvEmotes).findIndex(
          key => bttvEmotes[key]['category'] === 'bttv_shared'
        );
        if (i > -1) {
          setShowBTTVShared(true);
        } else {
          setShowBTTVShared(false);
        }

        let j = Object.keys(bttvEmotes).findIndex(
          key => bttvEmotes[key]['category'] === 'bttv_channel'
        );
        if (j > -1) {
          setShowBTTVChannel(true);
        } else {
          setShowBTTVChannel(false);
        }

        let k = Object.keys(bttvEmotes).findIndex(
          key => bttvEmotes[key]['category'] === 'ffz_channel'
        );
        if (k > -1) {
          setShowFFZChannel(true);
        } else {
          setShowFFZChannel(false);
        }
      }
    }
    return () => (mounted = false);
  }, [bttvEmotes]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (userEmoteSets) {
        emoteSets.current = {};
        let sets = Object.keys(userEmoteSets);
        for (let i in sets) {
          if (!emoteSets.current[userEmoteSets[sets[i]]['displayName']]) {
            emoteSets.current = {
              ...emoteSets.current,
              [userEmoteSets[sets[i]]['displayName']]: {
                emotes: userEmoteSets[sets[i]]['emotes'],
                profilePictureUrl: userEmoteSets[sets[i]]['profilePictureUrl'],
              },
            };
          }
        }
        setShowEmotes(true);
      }
    }
    return () => (mounted = false);
  }, [userEmoteSets]);

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button disabled={!loggedIn || !connected}>
          {
            <Box
              as="img"
              width={[12, 10, 10, 8]}
              alt="Emote Picker"
              // src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/static/light/3.0" // PogChamp
              src="https://static-cdn.jtvnw.net/emoticons/v2/307445021/static/light/3.0" // Orangie
              title="Emote Picker"
            />
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <Flex height={400} overflow="auto" direction="column">
          {showBTTVChannel && connected && (
            <>
              <PopoverHeader>BTTV Channel Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(bttvEmotes).map((key, index) => {
                      if (bttvEmotes[key]['category'] === 'bttv_channel') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              bttvEmotes[key][userOptions.emoteQuality + 'x']
                            }
                            height={8}
                            margin={1.5}
                            onClick={() => onClickHandler(key)}
                          />
                        );
                      }
                    })}
                </Flex>
              </PopoverBody>
            </>
          )}

          {showFFZChannel && connected && (
            <>
              <PopoverHeader>FFZ Channel Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(bttvEmotes).map((key, index) => {
                      if (bttvEmotes[key]['category'] === 'ffz_channel') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              bttvEmotes[key][userOptions.emoteQuality + 'x']
                            }
                            height={8}
                            margin={1.5}
                            onClick={() => onClickHandler(key)}
                          />
                        );
                      }
                    })}
                </Flex>
              </PopoverBody>
            </>
          )}

          {showBTTVShared && connected && (
            <>
              <PopoverHeader>BTTV Shared Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(bttvEmotes).map((key, index) => {
                      if (bttvEmotes[key]['category'] === 'bttv_shared') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              bttvEmotes[key][userOptions.emoteQuality + 'x']
                            }
                            height={8}
                            margin={1.5}
                            onClick={() => onClickHandler(key)}
                          />
                        );
                      }
                    })}
                </Flex>
              </PopoverBody>
            </>
          )}

          {showEmotes &&
            connected &&
            // eslint-disable-next-line array-callback-return
            Object.keys(emoteSets.current).map((key, index) => {
              if (key !== 'Twitch Global') {
                return (
                  <Box key={index}>
                    <PopoverHeader>{key}</PopoverHeader>
                    <PopoverBody>
                      <Flex flexWrap="wrap">
                        {emoteSets.current !== null &&
                          Object.keys(emoteSets.current[key]['emotes']).map(
                            (key, index) => {
                              return (
                                <ChatEmote
                                  key={index}
                                  name={key}
                                  src={
                                    userEmotes[key][
                                      userOptions.emoteQuality + 'x'
                                    ]
                                  }
                                  height={8}
                                  margin={1.5}
                                  onClick={() => onClickHandler(key)}
                                />
                              );
                            }
                          )}
                      </Flex>
                    </PopoverBody>
                  </Box>
                );
              }
            })}

          {connected && (
            <>
              <PopoverHeader>BTTV Global Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(bttvEmotes).map((key, index) => {
                      if (bttvEmotes[key]['category'] === 'bttv_global') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              bttvEmotes[key][userOptions.emoteQuality + 'x']
                            }
                            height={8}
                            margin={1.5}
                            onClick={() => onClickHandler(key)}
                          />
                        );
                      }
                    })}
                </Flex>
              </PopoverBody>
            </>
          )}

          {showEmotes && connected && (
            <>
              <PopoverHeader>Twitch Global</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {emoteSets.current !== null &&
                    Object.keys(
                      emoteSets.current['Twitch Global']['emotes']
                    ).map((key, index) => {
                      return (
                        <ChatEmote
                          key={index}
                          name={key}
                          src={userEmotes[key][userOptions.emoteQuality + 'x']}
                          height={8}
                          margin={1.5}
                          onClick={() => onClickHandler(key)}
                        />
                      );
                    })}
                </Flex>
              </PopoverBody>
            </>
          )}
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
