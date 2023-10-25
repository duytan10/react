import React from "react";

const AccordionHeader = ({ children, show, handleToggleShow }) => {
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
