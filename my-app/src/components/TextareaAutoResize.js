import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const TextareaAutoResize = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  //   const [parentHeight, setParentHeight] = useState("auto");

  const handleChange = (event) => {
    setTextareaHeight("auto");
    // setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
    setText(event.target.value);
  };

  useLayoutEffect(() => {
    setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
    // setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [text]);

  return (
    <div className="p-5">
      <textarea
        className="w-full max-w-[400px] p-5 rounded-lg border border-gray-300 resize-none focus:border-blue-400 leading-normal overflow-hidden transition-all"
        placeholder="Please enter your content..."
        value={text}
        ref={textareaRef}
        style={{
          height: textareaHeight,
        }}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextareaAutoResize;
