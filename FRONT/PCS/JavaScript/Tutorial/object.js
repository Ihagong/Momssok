let test = {
  key: "value", // 프로퍼티 (객체 프로퍼티)
  key1: 123,
  key2: true,
  key3: undefined,
  key4: [1, 2],
  key5: function () {}
}; // 객체 리터럴 방식

console.log(test);
console.log(test.key1);

let person = {
  name: "박찬석",
  age: 28,
  say: function () {
    console.log(`안녕 나는 ${this.name}`);
  }
};

console.log(person["name"]);
console.log(person.age)


console.log(getPropertyValue("name"))

function getPropertyValue (key) {
  return person[key];
}

person.loaction = "한국";
person["gender"] = "남성";

person.name = "박찬석 A"
person["age"] = 27;

delete person.age;
delete person["gender"];
person.loaction = null;
console.log(person);

person.say();
person["say"]();

console.log(`name : ${"name" in person}`);
console.log(`age : ${"age" in person}`);