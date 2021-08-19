import ChatEmote from 'features/chat/ChatEmote';
import { v4 as uuid } from 'uuid';

export default function insertEmotes(
  msgArray,
  emoteList,
  emoteQuality,
  isCheer = false
) {
  let qual = emoteQuality + 'x';
  let tempMsg = [];

  if (isCheer) {
    for (let i in msgArray) {
      tempMsg[i] = `${msgArray[i]}`.toLowerCase();
    }
  }

  for (let i in msgArray) {
    if (isCheer === false) {
      if (msgArray[i] in emoteList) {
        msgArray[i] = (
          <ChatEmote
            name={msgArray[i]}
            src={emoteList[msgArray[i]][qual]}
            key={uuid()}
          />
        );
      }
    } else {
      if (tempMsg[i] in emoteList) {
        msgArray[i] = (
          <ChatEmote
            name={msgArray[i]}
            src={emoteList[tempMsg[i]][qual]}
            key={uuid()}
          />
        );
      }
    }
  }
  return msgArray;
}
