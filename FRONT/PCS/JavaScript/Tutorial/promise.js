// function isPostive(number, resolve, reject) {
//   setTimeout(() => {
//     if (typeof number === "number") {
//       resolve(number >= 0 ? "양수" : "음수");
//     } else {
//       reject("주어진 값이 숫자형 값이 아닙니다.");
//     }
//   }, 2000);
// }

// isPostive(
//   10,
//   (res) => {
//     console.log("성공적으로 수행됨 :", res);
//   },
//   (err) => {
//     console.log("실패 하였음 :", err);
//   }
// );

// function isPostiveP(number) {
//   const executor = (resolve, reject) => {
//     setTimeout(() => {
//       if (typeof number === "number") {
//         console.log(number);
//         resolve(number >= 0 ? "양수" : "음수");
//       } else {
//         reject("주어진 값이 숫자형 값이 아닙니다.");
//       }
//     }, 2000);
//   };

//   const asyncTask = new Promise(executor);
//   return asyncTask;
// }

// const res = isPostiveP(100);

// res
//   .then((res) => {
//     console.log("작업 성공 :", res);
//   })
//   .catch((err) => {
//     console.log("작업 실패 :", err);
//   });

function taskA(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a + b;
      resolve(res);
    }, 3000);
  });
}

function taskB(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * 2;
      resolve(res);
    }, 1000);
  });
}

function taskC(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * -1;
      resolve(res);
    }, 2000);
  });
}

// taskA(3, 4, (a_res) => {
//   console.log("A RESULT :", a_res);
//   taskB(a_res, (b_res) => {
//     console.log("B RESULT :", b_res);
//     taskC(b_res, (c_res) => {
//       console.log("C RESULT :", c_res);
//     });
//   });
// });

// taskA(5, 1).then((a_res) => {
//   console.log("A RESULT :", a_res);
//   taskB(a_res).then((b_res) => {
//     console.log("B RESULT :", b_res);
//     taskC(b_res).then((c_res) => {
//       console.log("C RESULT :", c_res);
//     });
//   });
// });

// taskA(5, 1)
//   .then((a_res) => {
//     console.log("A RESULT :", a_res);
//     return taskB(a_res);
//   })
//   .then((b_res) => {
//     console.log("B RESULT :", b_res);
//     return taskC(b_res);
//   })
//   .then((c_res) => {
//     console.log("C RESULT :", c_res);
//   });

const bPromiseResult = taskA(5, 1).then((a_res) => {
  console.log("A RESULT :", a_res);
  return taskB(a_res);
});

console.log("test");
console.log("test2");

bPromiseResult
  .then((b_res) => {
    console.log("B RESULT :", b_res);
    return taskC(b_res);
  })
  .then((c_res) => {
    console.log("C RESULT :", c_res);
  });