export default function insertSpaces(msgArray) {
  for (let i = 0; i < msgArray.length; i++) {
    msgArray.splice(i + 1, 0, ' ');
    i++;
  }
  return msgArray;
}
