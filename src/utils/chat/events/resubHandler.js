import getSubTier from '../../getSubTier';

export default function resubHandler(streakMonths, userstate, methods) {
  const tier = getSubTier(methods);

  if (userstate['msg-param-cumulative-months'] === 1) {
    var months = `1 month`;
  } else {
    months = `${userstate['msg-param-cumulative-months']} months`;
  }

  var msg = ` has resubscribed! (${tier}, ${months}`;

  if (userstate['msg-param-should-share-streak']) {
    msg += `, ${streakMonths} month streak)`;
  } else {
    msg += ')';
  }

  return msg;
}
