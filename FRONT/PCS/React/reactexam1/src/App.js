// import './App.css';

import React from "react";
import Counter from "./Counter";
import Container from "./Container";
import MyHeader from "./MyHeader";

function App() {
  // let name = "박찬석";

  // const style = {
  //   App: {
  //     backgroundColor: "black",
  //   },
  //   h2: {
  //     color: "red",
  //   },
  //   bold_text: {
  //     color: "green",
  //   },
  // };

  // const func = () => {
  //   return 'func';
  // }

  // const number = 5;

  //   return (
  //     <div style={style.App}>
  //       <MyHeader />
  //         <h2 style={style.h2}>
  //           안녕 리액트 {func()}
  //         </h2>
  //         <b style={style.bold_text}>
  //           {number}는 : {number % 2 === 0 ? "짝수" : "홀수"}
  //         </b>
  //     </div>
  //   );
  // }
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    // initialValue: 5,
  };

  return (
    <Container>
      <div>
        <MyHeader />
        <Counter {...counterProps} />
      </div>
    </Container>
  );
}

export default App;
