// async

// function hello() {
//   return "hello";
// }

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// async function helloAsync() {
//   return delay(3000).then(() => {
//     return "hello Async";
//   });
// }

async function helloAsync() {
  await delay(3000);
  return "hello asynce";
}

async function main() {
  const res = await helloAsync();
  console.log(res);
}

main();

// console.log(hello());
// console.log(helloAsync());