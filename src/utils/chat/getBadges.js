import ChatBadge from 'features/chat/ChatBadge';
import { v4 as uuid } from 'uuid';

export default function getBadges(
  msgBadges,
  channelBadges,
  globalBadges,
  badgeQuality
) {
  let badges = [];
  const keys = Object.keys(msgBadges);
  const qual = badgeQuality + 'x';

  for (var i in keys) {
    try {
      if (keys[i] in channelBadges) {
        if (channelBadges[keys[i]][msgBadges[keys[i]]]) {
          var src = channelBadges[keys[i]][msgBadges[keys[i]]][qual];
        } else {
          src = globalBadges[keys[i]][msgBadges[keys[i]]][qual];
        }
      } else if (keys[i] in globalBadges) {
        src = globalBadges[keys[i]][msgBadges[keys[i]]][qual];
      }
      badges.push(<ChatBadge name={keys[i]} src={src} key={uuid()} />);
    } catch {
      console.warn([
        'Broken badge',
        {
          msgBadges,
          channelBadges,
          globalBadges,
          badgeQuality,
          'keys[i]': keys[i],
          'msgBadges[keys[i]]': msgBadges[keys[i]],
        },
      ]);
    }
  }
  return badges;
}
