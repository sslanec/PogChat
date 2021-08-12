import { useContext } from 'react';
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
        <Flex maxHeight={400} overflow="auto" direction="column">
          <PopoverHeader>BTTV Emotes</PopoverHeader>
          <PopoverBody>
            <Flex flexWrap="wrap">
              {user.bttvEmotes !== null &&
                Object.keys(user.bttvEmotes).map((key, index) => {
                  return (
                    <ChatEmote
                      key={index}
                      name={key}
                      src={
                        user.bttvEmotes[key][
                          user.userOptions.emoteQuality + 'x'
                        ]
                      }
                    />
                  );
                })}
            </Flex>
          </PopoverBody>
          <PopoverHeader>Twitch Emotes</PopoverHeader>
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
                    />
                  );
                })}
            </Flex>
          </PopoverBody>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
