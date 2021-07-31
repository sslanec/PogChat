export default function raidedHandler(viewers) {
  if (viewers === 1) {
    var msg = ` is raiding with 1 viewer!`;
  } else {
    msg = ` is raiding with ${viewers} viewers!`;
  }
  return msg;
}
