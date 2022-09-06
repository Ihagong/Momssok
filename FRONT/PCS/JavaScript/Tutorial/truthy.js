let a = undefined;

if (a) {
  console.log("TRUE");
} else {
  console.log("FALSE");
}

const getName = (person) => {
  if (!person) {
    return "객체가 아닙니다";
  }
  return person.name;
};

let person = { name: "박찬석" };
const name = getName(person);
console.log(name);