const deeperCount = (input) => {
  const arr = input.split('\n');
  const nums = arr.map((num) => parseInt(num));
  let count = 0;
  for (let i = 0; i < nums.length - 1; ++i) if (nums[i] < nums[i + 1]) ++count;
  console.log(count);
}; // 1233

const deeperCountWindow = (input) => {
  const arr = input.split('\n');
  const nums = arr.map((num) => parseInt(num));
  let count = 0;

  const sumWindow = (arr, start, end) => {
    return arr.slice(start, end).reduce((sum, cur) => sum + cur, 0);
  };
  for (let i = 0; i < nums.length - 3; ++i)
    if (sumWindow(nums, i, i + 3) < sumWindow(nums, i + 1, i + 4)) ++count;
  console.log(count);
}; // 1275
