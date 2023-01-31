import React, { useState } from "react";
import "./ToggleStyle.css";

const Toggle = () => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <div className={`toggle ${on ? "active" : ""}`}>
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export default Toggle;
