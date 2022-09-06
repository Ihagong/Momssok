console.log(true && true);

console.log(true || false);

console.log(!true);

// const getName = (person) => {
//   if (!person) {
//     return "객체가 아닙니다.";
//   }
//   return person.name;
// };

const getName = (person) => {
  const name = person && person.name;
  return name || "객체가 아닙니다";
};

let person = null;
const name = getName(person);
console.log(name);