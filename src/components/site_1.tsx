import React from "react";
import Licznik from "./licznik";
import { CounterWithReducer } from "./reducer";
const About: React.FC = () => {
  return (
    <div>
      <CounterWithReducer></CounterWithReducer>
      <Licznik></Licznik>
    </div>
  );
};
export default About;
