const cookie = {
  base: "cookie",
  madeIn: "korea"
};

const chocochipCookie = {
  // base: "cookie",
  // madeIn: "korea",
  ...cookie,
  toping: "chocochip"
};

const blueberryCookie = {
  // base: "cookie",
  // madeIn: "korea",
  ...cookie,
  toping: "blueberry"
};

const strawberryCookie = {
  // base: "cookie",
  // madeIn: "korea",
  ...cookie,
  toping: "strawberry"
};

console.log(chocochipCookie);
console.log(blueberryCookie);
console.log(strawberryCookie);

const noTopingCookies = ["촉촉한쿠키", "안촉촉한쿠키"];
const topingCookies = ["바나나쿠키", "블루베리쿠피", "딸기쿠키", "초코칩쿠키"];

const allCookies = [...noTopingCookies, "함정쿠키", ...topingCookies];
console.log(allCookies);