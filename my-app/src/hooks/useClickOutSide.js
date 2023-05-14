import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    function handleClickOutDropdown(event) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(event.target) &&
        !event.target.matches(dom)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutDropdown);
    };
  }, []);

  return {
    show,
    setShow,
    nodeRef,
  };
}
