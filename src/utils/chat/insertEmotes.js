import ChatEmote from '../../components/ChatEmote/ChatEmote';
import { v4 as uuid } from 'uuid';

export default function insertEmotes(msgArray, emoteList, emoteQuality) {
  let qual = emoteQuality + 'x';

  for (let i in msgArray) {
    if (msgArray[i] in emoteList) {
      msgArray[i] = (
        <ChatEmote
          name={msgArray[i]}
          src={emoteList[msgArray[i]][qual]}
          key={uuid()}
        />
      );
    }
  }
  return msgArray;
}
