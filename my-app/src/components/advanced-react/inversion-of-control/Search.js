import React from "react";

const Search = ({ inputPlaceHolder, onChange }) => {
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={inputPlaceHolder}
        className="p-3 outline-none w-full border border-gray-200 rounded"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
