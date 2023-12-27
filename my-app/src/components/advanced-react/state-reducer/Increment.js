import React from "react";
import useCounter from "./useCounter";

const Increment = ({ onClick, ...props }) => {
    return (
        <div>
            <button className="increment p-5 flex items-center justify-center bg-slate-200 text-lg cursor-pointer" onClick={onClick} {...props}>
                +
            </button>
        </div>
    );
};

export default Increment;
