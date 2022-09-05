let arr1 = new Array();
let arr2 = [1, "2", true, null, undefined, {}, [], function () {}]; // 배열 리터럴
let arr3 = [1, 2, 3, 4, 5];
console.log(arr3[0]);

arr3.push(6);

console.log(arr3);
console.log(arr3.length);

for (let i = 1; i <= 10; i++) {
  console.log("coldstone");
}

const arr = ["a", "b", "c"];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

let person = {
  name: "박찬석",
  age: 28,
  tall: 175
};

const personKeys = Object.keys(person);
console.log(personKeys);
const personValues = Object.values(person);
console.log(personValues)

for ( let i=0; i < personKeys.length; i++ ) {

  const curKey = personKeys[i];
  const curValue = person[curKey];

  console.log(`${curKey} : ${curValue}`);
}

const arrr = [1, 2, 3, 4];
const newArr = []

arrr.forEach((elm) => console.log(elm));

arrr.forEach((function (elm) {
  console.log(elm * 2);
  newArr.push(elm * 2);
}))

console.log(newArr);

const newArrr = arrr.map((elm) => {
  return elm * 3;
});

console.log(newArrr);

let number = 3;

arrr.forEach((elm) => {
  if (elm === number) {
    console.log(true);
  }
});

console.log(arrr.includes(number));

console.log(arrr.indexOf(number));

const arrC = [
  { num: 1, color: "red" },
  { num: 2,  color: "black" },
  { num: 3,  color: "blue" },
  { num: 4,  color: "green" }
];

console.log(arrC.findIndex((elm) => {
  return elm.color === "green";
  })
);

const idx = arrC.findIndex((elm) => {
  return elm.color === "blue";
});

console.log(idx);

const element = arrC.find((elm) => {
  return elm.color === "blue";
});

console.log(element);


console.log(arrC.filter((elm) => elm.color === "blue"));

console.log(arrC.slice(0, 2));

const arrC1 = [
  { num: 1, color: "red" },
  { num: 2,  color: "black" }
];

const arrC2 = [
  { num: 3,  color: "blue" },
  { num: 4,  color: "green" }
];

console.log(arrC1.concat(arrC2));

let chars = ["나", "다", "가"];

chars.sort();

console.log(chars);

let numbers = [0, 1, 3, 20, 32, 24];




const compare = (a, b) => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

numbers.sort(compare);

console.log(numbers);


const arrT = ["박찬석", "님", "안녕하세요", "또 오셨군요"];

console.log(arrT);

console.log(arrT.join(" "));