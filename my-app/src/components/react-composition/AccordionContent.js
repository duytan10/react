import React from "react";
import { useAccordion } from "./accordion-context";

const AccordionContent = ({ children }) => {
    const { show } = useAccordion();
    return <>{show && <div className="content p-4 border border-gray-200 rounded-lg">{children}</div>}</>;
};

export default AccordionContent;
