import getSubTier from '../../getSubTier';

export default function subGift(streakMonths, methods) {
  var tier = getSubTier(methods);

  var msg = ` is gifting a ${tier} sub to `;

  return msg;
}
