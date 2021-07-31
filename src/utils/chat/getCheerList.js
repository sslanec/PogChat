import capitalizeFirstLetter from '../capitalizeFirstLetter';

export default function getCheerList(cheerParse) {
  let cheerList = {};
  for (let i in cheerParse) {
    let key = capitalizeFirstLetter(
      cheerParse[i]['name'] + cheerParse[i]['amount']
    );
    let url = cheerParse[i]['displayInfo']['url'];
    url = url.substring(0, url.length - 5);
    cheerList[key] = {
      '1x': url + '2.gif',
      '2x': url + '3.gif',
      '3x': url + '4.gif',
    };
  }
  return cheerList;
}
