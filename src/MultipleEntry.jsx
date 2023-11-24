import React, { useState } from "react";
import "./Common.css"
import "./MultipleEntry.css"

const MultipleEntry = ({ children, buttonClassName }) => {
    const [formQuestionsCount, setFormQuestionsCount] = useState(1);

    const addFormQuestion = () => {
        setFormQuestionsCount(formQuestionsCount + 1);
    };

    return (
        <>
            {[...Array(formQuestionsCount)].map((_, index) => (
                <React.Fragment key={index}>
                    {React.Children.map(children, child => 
                        child && React.cloneElement(child, { key: index })
                    )}
                </React.Fragment>
            ))}
            <button type="button" className={"action-button multiple-entry-button " + buttonClassName} onClick={addFormQuestion}>
                Añadir más
            </button>
        </>
    );
};

export default MultipleEntry;
