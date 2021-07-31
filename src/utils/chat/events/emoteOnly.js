export default function emoteOnly(enabled) {
  if (enabled) {
    var msg = 'Chat is in emote-only mode.';
  } else {
    msg = 'Chat is no longer in emote-only mode.';
  }
  return msg;
}
