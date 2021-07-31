import getSubTier from '../../getSubTier';

export default function subMysteryGift(numOfSubs, methods, userstate) {
  const tier = getSubTier(methods);

  var msg = ' is gifting';
  if (numOfSubs === 1) {
    msg += ` a ${tier} Sub to the community!`;
  } else {
    msg += ` ${numOfSubs} ${tier} Subs to the community!`;
  }

  if (userstate['msg-param-sender-count']) {
    msg += ` (${userstate['msg-param-sender-count']} lifetime Gift Subs)`;
  }
  return msg;
}
