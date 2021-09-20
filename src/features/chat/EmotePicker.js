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

export default function EmotePicker(props) {
  const [showBTTVShared, setShowBTTVShared] = useState(false);
  const [showBTTVChannel, setShowBTTVChannel] = useState(false);
  const [showFFZChannel, setShowFFZChannel] = useState(false);
  const [showEmotes, setShowEmotes] = useState(false);
  const emoteSets = useRef();

  const bttvEmotes = useSelector(state => state.user.bttvEmotes);
  const userEmoteSets = useSelector(state => state.user.userEmoteSets);
  const userOptions = useSelector(state => state.user.userOptions);
  const userEmotes = useSelector(state => state.user.userEmotes);

  const onClickHandler = key => {
    props.insertEmote(key);
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
      // console.log(emoteSets.current);
    }
    return () => (mounted = false);
  }, [userEmoteSets]);

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

          {showFFZChannel && (
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

          {showBTTVShared && (
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
                </>
              );
            })}

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
                        src={bttvEmotes[key][userOptions.emoteQuality + 'x']}
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
              {userEmotes !== null &&
                Object.keys(userEmotes).map((key, index) => {
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
                })}
            </Flex>
          </PopoverBody> */}
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
