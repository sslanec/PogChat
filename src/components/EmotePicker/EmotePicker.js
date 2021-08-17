import { useContext, useEffect, useRef, useState } from 'react';
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
import UserContext from '../../context/User/User';
import ChatEmote from '../ChatEmote/ChatEmote';

export default function EmotePicker(props) {
  const { user } = useContext(UserContext);
  const [showBTTVShared, setShowBTTVShared] = useState(false);
  const [showBTTVChannel, setShowBTTVChannel] = useState(false);
  const [showFFZChannel, setShowFFZChannel] = useState(false);
  const [showEmotes, setShowEmotes] = useState(false);
  const emoteSets = useRef();

  const onClickHandler = key => {
    props.insertEmote(key);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (user.bttvEmotes) {
        let i = Object.keys(user.bttvEmotes).findIndex(
          key => user.bttvEmotes[key]['category'] === 'bttv_shared'
        );
        if (i > -1) {
          setShowBTTVShared(true);
        } else {
          setShowBTTVShared(false);
        }

        let j = Object.keys(user.bttvEmotes).findIndex(
          key => user.bttvEmotes[key]['category'] === 'bttv_channel'
        );
        if (j > -1) {
          setShowBTTVChannel(true);
        } else {
          setShowBTTVChannel(false);
        }

        let k = Object.keys(user.bttvEmotes).findIndex(
          key => user.bttvEmotes[key]['category'] === 'ffz_channel'
        );
        if (k > -1) {
          setShowFFZChannel(true);
        } else {
          setShowFFZChannel(false);
        }
      }
    }
    return () => (mounted = false);
  }, [user.bttvEmotes]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (user.emoteSets) {
        emoteSets.current = {};
        let sets = Object.keys(user.emoteSets);
        for (let i in sets) {
          if (!emoteSets.current[user.emoteSets[sets[i]]['displayName']]) {
            emoteSets.current = {
              ...emoteSets.current,
              [user.emoteSets[sets[i]]['displayName']]: {
                emotes: user.emoteSets[sets[i]]['emotes'],
                profilePictureUrl: user.emoteSets[sets[i]]['profilePictureUrl'],
              },
            };
          }
        }
        setShowEmotes(true);
      }
      // console.log(emoteSets.current);
    }
    return () => (mounted = false);
  }, [user.emoteSets]);

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button disabled={props.disabled}>
          {
            <Box
              as="img"
              height={6}
              width={7}
              alt="Emote Picker"
              src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/static/light/3.0"
              title="Emote Picker"
            />
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <Flex height={400} overflow="auto" direction="column">
          {showBTTVChannel && (
            <>
              <PopoverHeader>BTTV Channel Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {user.bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(user.bttvEmotes).map((key, index) => {
                      if (user.bttvEmotes[key]['category'] === 'bttv_channel') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              user.bttvEmotes[key][
                                user.userOptions.emoteQuality + 'x'
                              ]
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

          {showFFZChannel && (
            <>
              <PopoverHeader>FFZ Channel Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {user.bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(user.bttvEmotes).map((key, index) => {
                      if (user.bttvEmotes[key]['category'] === 'ffz_channel') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              user.bttvEmotes[key][
                                user.userOptions.emoteQuality + 'x'
                              ]
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

          {showBTTVShared && (
            <>
              <PopoverHeader>BTTV Shared Emotes</PopoverHeader>
              <PopoverBody>
                <Flex flexWrap="wrap">
                  {user.bttvEmotes !== null &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(user.bttvEmotes).map((key, index) => {
                      if (user.bttvEmotes[key]['category'] === 'bttv_shared') {
                        return (
                          <ChatEmote
                            key={index}
                            name={key}
                            src={
                              user.bttvEmotes[key][
                                user.userOptions.emoteQuality + 'x'
                              ]
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
            Object.keys(emoteSets.current).map(key => {
              // console.log({ key, index, array });
              return (
                <>
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
                                  user.userEmotes[key][
                                    user.userOptions.emoteQuality + 'x'
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
                </>
              );
            })}

          <PopoverHeader>BTTV Global Emotes</PopoverHeader>
          <PopoverBody>
            <Flex flexWrap="wrap">
              {user.bttvEmotes !== null &&
                // eslint-disable-next-line array-callback-return
                Object.keys(user.bttvEmotes).map((key, index) => {
                  if (user.bttvEmotes[key]['category'] === 'bttv_global') {
                    return (
                      <ChatEmote
                        key={index}
                        name={key}
                        src={
                          user.bttvEmotes[key][
                            user.userOptions.emoteQuality + 'x'
                          ]
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

          {/* <PopoverHeader>Twitch Emotes</PopoverHeader>
          <PopoverBody>
            <Flex flexWrap="wrap">
              {user.userEmotes !== null &&
                Object.keys(user.userEmotes).map((key, index) => {
                  return (
                    <ChatEmote
                      key={index}
                      name={key}
                      src={
                        user.userEmotes[key][
                          user.userOptions.emoteQuality + 'x'
                        ]
                      }
                      height={8}
                      margin={1.5}
                      onClick={() => onClickHandler(key)}
                    />
                  );
                })}
            </Flex>
          </PopoverBody> */}
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
