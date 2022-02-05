const binary1 = (d) => {
  let gammaRate = '';
  for (let i = 0; i < d[0].length; ++i) {
    const zeros = d.reduce(
      (acc, cur) => (cur.charAt(i) === '0' ? acc + 1 : acc),
      0
    );
    const ones = d.reduce(
      (acc, cur) => (cur.charAt(i) === '1' ? acc + 1 : acc),
      0
    );
    if (zeros > ones) gammaRate += '0';
    else gammaRate += '1';
  }
  // epsilon is the opposite of gammaRate
  let epsilonRate = gammaRate
    .replaceAll(0, '$')
    .replaceAll(1, 0)
    .replaceAll('$', 1);

  // convert to decimal
  gammaRate = parseInt(gammaRate, 2);
  epsilonRate = parseInt(epsilonRate, 2);

  return gammaRate * epsilonRate;
};

const binary2 = (d) => {
  // compares the counts of zeros and ones at each string's index i
  const zeroMoreCommon = (arr, i) => {
    const zeros = arr.reduce(
      (acc, cur) => (cur.charAt(i) === '0' ? acc + 1 : acc),
      0
    );
    const ones = arr.reduce(
      (acc, cur) => (cur.charAt(i) === '1' ? acc + 1 : acc),
      0
    );
    return zeros - ones;
  };

  // find oxygen
  let oxygenFilter = [...d];
  for (let i = 0; i < oxygenFilter[0].length; ++i) {
    if (zeroMoreCommon(oxygenFilter, i) > 0)
      oxygenFilter = oxygenFilter.filter((str) => str.charAt(i) === '0');
    else oxygenFilter = oxygenFilter.filter((str) => str.charAt(i) === '1');
    if (oxygenFilter.length === 1) break;
  }

  // find CO2
  let co2filter = [...d];
  for (let i = 0; i < co2filter[0].length; ++i) {
    if (zeroMoreCommon(co2filter, i) > 0)
      co2filter = co2filter.filter((str) => str.charAt(i) === '1');
    else co2filter = co2filter.filter((str) => str.charAt(i) === '0');
    if (co2filter.length === 1) break;
  }

  // calculate life support
  const oxygen = parseInt(oxygenFilter[0], 2);
  const co2 = parseInt(co2filter[0], 2);
  return oxygen * co2;
};

const fs = require('fs');

fs.readFile('./adventOfCode2021/data.txt', (e, text) => {
  const data = text.toString().split('\n');
  console.log(binary1(data)); // 2640986
  console.log(binary2(data)); // 6822109
});
