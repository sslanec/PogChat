export default function slowMode(enabled, length) {
  if (enabled) {
    var msg = `Chat is in ${length}-second slow mode.`;
  } else {
    msg = 'Chat is no longer in slow mode.';
  }
  return msg;
}
