const dive1 = (input) => {
  const arr = input.split('\n');
  let h = 0,
    d = 0;
  for (let i of arr) {
    const [dir, x] = i.split(' ');
    if (dir === 'forward') h += parseInt(x);
    else if (dir === 'up') d -= parseInt(x);
    else d += parseInt(x);
  }
  return h * d;
}; // 1561344

const dive2 = (input) => {
  const arr = input.split('\n');
  let h = 0,
    d = 0,
    aim = 0;
  for (let i of arr) {
    const [dir, x] = i.split(' ');
    if (dir === 'forward') {
      h += parseInt(x);
      d += aim * x;
    } else if (dir === 'up') {
      aim -= parseInt(x);
    } else {
      aim += parseInt(x);
    }
  }

  return h * d;
}; // 1848454425
