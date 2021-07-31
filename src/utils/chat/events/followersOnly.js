export default function followersOnly(enabled, length) {
  if (enabled) {
    if (length === 0) {
      var msg = 'Chat is in followers-only mode.';
    } else if (length === 1) {
      msg =
        'Chat is in followers-only mode. You can chat after ' +
        'following for 1 minute.';
    } else if (length > 1) {
      msg =
        'Chat is in followers-only mode. You can chat after ' +
        `following for ${length} minutes.`;
    }
  } else {
    msg = 'Chat is no longer in followers-only mode.';
  }
  return msg;
}
