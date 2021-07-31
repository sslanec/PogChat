export default function subsOnly(enabled) {
  if (enabled) {
    var msg = `Chat is in subs-only mode.`;
  } else {
    msg = 'Chat is no longer in subs-only mode.';
  }
  return msg;
}
