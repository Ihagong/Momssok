// let arr = ["one", "two", "three"];

// let one = arr[0];
// let two = arr[1];
// let three = arr[2];

// console.log(one, two, three);

// let [one, two, three] = arr;

// let [one, two, three, four = "four"] = ["one", "two", "three"];

// console.log(one, two, three, four);

let a = 10;

let b = 20;

// let tmp = 0;

// tmp = a;
// a = b;
// b = tmp;

[a, b] = [b, a];
console.log(a, b);

let object = { one: "one", two: "two", three: "three", name: "박찬석" };

// let one = object.one;
// let two = object.two;
// let three = object["three"];

let { name: myName, one, two, three } = object;
console.log(one, two, three, myName);