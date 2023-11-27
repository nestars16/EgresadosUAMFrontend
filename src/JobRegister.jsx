import FormQuestion from "./FormQuestion"
import "./JobRegister.css" 
import { useState } from "react";
import MultipleEntry from "./MultipleEntry";

const OldJobRegister = ({index}) => {
    return (
        <>
            <FormQuestion name={`old-pos${index}`}type="text">
                ¿En qué trabajaba?
            </FormQuestion> 
            <FormQuestion name={`old-start-date${index}`} type="date">
                ¿Cuándo empezó?
            </FormQuestion> 
            <FormQuestion name={`old-end-date${index}`} type="date">
                ¿Cuál fue su fecha de terminación?
            </FormQuestion> 
        </>
    )
}

const JobRegister = () => {

    const [hasJobHistory, setHasJobHistory] = useState(false)

    const handleCheckboxChange = () => {
        setHasJobHistory(!hasJobHistory);
    };

    return (
        <>
           <FormQuestion name="current-pos" type="text">
                ¿En qué trabaja actualmente?
            </FormQuestion> 
           <FormQuestion type="date" name="current-pos-start-date">
                ¿Cuando empezó?
            </FormQuestion> 
            <div className="toggle-container">
                <label htmlFor="job-history" className="question-text toggle">
                    <input
                        className="toggle"
                        id="job-history"
                        type="checkbox"
                        checked={hasJobHistory}
                        onChange={handleCheckboxChange}
                    />
                    Agregar historial laboral
                </label>
            </div>
            {
                hasJobHistory && (
                    <MultipleEntry>
                        <OldJobRegister/>
                    </MultipleEntry>
                )
            }
        </>
    )
}


export default JobRegister
