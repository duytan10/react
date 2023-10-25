import React from "react";
import useToggle from "./useToggle";
import AccordionHeader from "./AccordionHeader";
import AccordionContent from "./AccordionContent";

const Accordion = ({ header, children }) => {
    const { value: show, handleToggleValue: handleToggleShow } = useToggle();
    return (
        <div className="mb-5">
            <AccordionHeader show={show} handleToggleShow={handleToggleShow}>
                {header}
            </AccordionHeader>
            <AccordionContent show={show}>{children}</AccordionContent>
        </div>
    );
};

export default Accordion;
