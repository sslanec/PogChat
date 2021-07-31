import getSubTier from '../../getSubTier';

export default function subHandler(methods) {
  const tier = getSubTier(methods);

  var msg = ` has subscribed! (${tier})`;

  return msg;
}
