import FormQuestion from "./FormQuestion"
import "./JobRegister.css" 
import { useState } from "react";
import MultipleEntry from "./MultipleEntry";

const JobRegister = () => {

    const [hasJobHistory, setHasJobHistory] = useState(false)

    const handleCheckboxChange = () => {
        setHasJobHistory(!hasJobHistory);
    };

    return (
        <>
           <FormQuestion id="current-pos" type="text">
                ¿En qué trabaja actualmente?
            </FormQuestion> 
           <FormQuestion type="date">
                ¿Cuando empezó?
            </FormQuestion> 
            <div className="toggle-container">
                <label for="job-history" className="question-text toggle">
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
                        <FormQuestion id="current-pos" type="text">
                             ¿En qué trabajaba?
                         </FormQuestion> 
                        <FormQuestion type="date">
                             ¿Cuándo empezó?
                         </FormQuestion> 
                        <FormQuestion type="date">
                             ¿Cuál fue su fecha de terminación?
                         </FormQuestion> 
                    </MultipleEntry>
                )
            }
        </>
    )
}


export default JobRegister
