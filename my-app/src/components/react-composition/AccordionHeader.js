import React from "react";
import { useAccordion } from "./accordion-context";

const AccordionHeader = ({ children }) => {
    const { show, handleToggleShow } = useAccordion();
    return (
        <div>
            <div className="header cursor-pointer p-4 border border-gray-200 rounded-lg flex items-center" onClick={handleToggleShow}>
                <span>{children}</span>
                {show ? <span>-</span> : <span>+</span>}
            </div>
        </div>
    );
};

export default AccordionHeader;
