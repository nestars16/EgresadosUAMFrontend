import { useState } from "react" 
import ContentContainer from "./ContentContainer"
import FormQuestion from "./FormQuestion"
import MultipleEntry from "./MultipleEntry"
import DropdownSelector from  "./DropdownSelector"
import LandingPageLogo from "./LandingPageLogo"
import UAMLogoWhite from "./assets/UAMLogoWhite.png"
import "./FormCreation.css"
import "./Common.css"

const FormCreation = () => {

    const [isTextQuestion, setIsTextQuestion] = useState(true)

    const selectAction = (e) => {
        if(e.target.value === "Selección Multiple") {
            setIsTextQuestion(false)
        } else {
            setIsTextQuestion(true)
        }
    }

    const questionTypes = ["Texto","Selección Multiple"]
    return (
        <>
        <LandingPageLogo text="Encuestas" src={UAMLogoWhite}/>
        <ContentContainer>
            <form>
                <FormQuestion>
                    Ingrese el nombre de su encuesta
                </FormQuestion>
                <MultipleEntry>
                    <FormQuestion>
                        Ingrese su pregunta
                    </FormQuestion>
                    <DropdownSelector onChange={selectAction} prompt={"¿Cuál es el tipo de su pregunta?"} options={questionTypes}/>
                {
                    !isTextQuestion && 
                    <MultipleEntry buttonClassName={"secondary-add-button"}>
                        <FormQuestion>
                            Ingrese su respuesta
                        </FormQuestion>
                    </MultipleEntry>
                }
                </MultipleEntry>
                <input type="submit" className="submit-button action-button" value="Crear"/>
            </form>
        </ContentContainer>
        </>
    )
}

export default FormCreation
