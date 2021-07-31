export default function hostingHandler(target, viewers) {
  if (viewers === 1) {
    var msg = `Now hosting ${target} with 1 viewer!`;
  } else {
    msg = `Now hosting ${target} with ${viewers} viewers!`;
  }
  return msg;
}
