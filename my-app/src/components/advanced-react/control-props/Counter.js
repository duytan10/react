import React from "react";
import Decrement from "./Decrement";
import Increment from "./Increment";
import Count from "./Count";
import { CountProvider } from "./count-context";

const Counter = () => {
    return (
        <CountProvider value={{ count: 10 }}>
            <div className="flex w-full max-w-[200px] mx-auto my-5 border border-gray-300 rounded-lg">
                <Decrement></Decrement>
                <Count></Count>
                <Increment></Increment>
            </div>
        </CountProvider>
    );
};

export default Counter;
