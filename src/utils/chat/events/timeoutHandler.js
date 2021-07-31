export default function timeoutHandler(duration) {
  if (duration === 1) {
    var msg = ' has been timed out for 1 second.';
  } else {
    msg = ` has been timed out for ${duration} seconds.`;
  }
  return msg;
}
