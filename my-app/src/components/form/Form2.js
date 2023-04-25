import React from "react";
import useHandleChange from "../hooks/useHandleChange";

const Form2 = () => {
  const { values, handleChange } = useHandleChange;
  return (
    <div className="p-5">
      <div className="flex gap-x-3">
        <input
          type="text"
          name="fullname"
          className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="w-full max-w-[300px] p-5 border border-gray-200 rounded-lg"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input type="checkbox" name="hobby" onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Form2;
