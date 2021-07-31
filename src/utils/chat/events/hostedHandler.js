export default function hostedHandler(viewers, autohost) {
  if (viewers === 1) {
    var msg = ` is hosting the stream for 1 viewer!`;
  } else {
    msg = ` is hosting the stream for ${viewers} viewers!`;
  }
  if (autohost) {
    msg += ' (Auto-host)';
  }
  return msg;
}
