import React from 'react';
import Licznik from './licznik';
import { CouterWithReducer } from './reducer';
const About: React.FC = () => {
    return <div><h1>About Page</h1>
    <CouterWithReducer></CouterWithReducer>
    <Licznik></Licznik></div>;
};
export default About;