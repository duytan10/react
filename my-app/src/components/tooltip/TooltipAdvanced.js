import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal";

const TooltipAdvanced = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({});
  const nodeRef = useRef(null);

  const handleMouseEnter = (e) => {
    setCoords(e.target.getBoundingClientRect());
    console.log(e.target.getBoundingClientRect());
    setVisible(true);
  };
  const handleMouseLeave = () => {
    setVisible(false);
  };
  return (
    <div className="relative inline-block">
      <CSSTransition
        in={visible}
        nodeRef={nodeRef}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        {(status) => (
          <Portal visible={status !== "exited"} overlay={false} ref={nodeRef}>
            <p
              className="absolute inline-block p-2 text-white -translate-x-1/2 -translate-y-full bg-black rounded-lg tooltip z-[9999]"
              style={{
                left: coords.left + coords.width / 2,
                top: coords.top - coords.height / 2 + window.scrollY,
              }}
            >
              {children}
            </p>
          </Portal>
        )}
      </CSSTransition>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
      </div>
    </div>
  );
};

export default TooltipAdvanced;
