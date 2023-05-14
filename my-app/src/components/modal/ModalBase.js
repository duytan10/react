import React, { useRef } from "react";
import Portal from "../Portal";
import { CSSTransition } from "react-transition-group";

const ModalBase = ({ visible, onClose, children, bodyClassName }) => {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={visible}
        timeout={250}
        unmountOnExit
        classNames="zoom"
      >
        {(status) => (
          <Portal
            visible={status !== "exited"}
            onClose={onClose}
            containerClassName="fixed z-[9999] inset-0 flex items-center justify-center"
            ref={nodeRef}
            bodyClassName={`relative z-10 content ${bodyClassName}`}
          >
            {children}
          </Portal>
        )}
      </CSSTransition>
    </>
  );
};

export default ModalBase;
