import { useState } from "react" 
import ContentContainer from "./ContentContainer"
import FormQuestion from "./FormQuestion"
import MultipleEntry from "./MultipleEntry"
import DropdownSelector from  "./DropdownSelector"
import LandingPageLogo from "./LandingPageLogo"
import UAMLogoWhite from "./assets/UAMLogoWhite.png"
import "./FormCreation.css"
import "./FormView.css"
import "./Common.css"
import { Link , useNavigate} from "react-router-dom"
import { API_URL } from "./globals"

const AdminQuestion = ({index}) => {

    const [isTextQuestion, setIsTextQuestion] = useState(true)

    const questionTypes = ["Texto","Selección Multiple"]

    const selectAction = (e) => {
        if(e.target.value === "Selección Multiple") {
            setIsTextQuestion(false)
        } else {
            setIsTextQuestion(true)
        }
    }

    return (
        <>
        <DropdownSelector onChange={selectAction} prompt={"¿Cuál es el tipo de su pregunta?"} options={questionTypes} name={`question_type${index}`}/>
        {
            isTextQuestion ? 
            <FormQuestion name={`question-text${index}`}>
                Ingrese su pregunta
            </FormQuestion> 
            :
            <>
            <FormQuestion name={`question-text${index}`}>
                Ingrese su pregunta
            </FormQuestion>
            <MultipleEntry buttonClassName={"secondary-add-button"}>
                <FormQuestion name={`answer${index}`}>
                    Ingrese su respuesta
                </FormQuestion>
            </MultipleEntry>
            </>
        }
        </>
    )

}

const FormCreation = () => {


    const navigate = useNavigate();
    const formDataToDesiredFormat = (formData) => {
        
        let form = {}

        const getNumbersAtEndOfString = (string) => {
            const numbersAtEndOfString = string.match(/\d+$/);
            
            if(!numbersAtEndOfString) {
                return -1;
            }

            return parseInt(numbersAtEndOfString[0]);
        }

        const getQuestionTypeEnumValue = (enumString) => {

            switch(enumString){
                case "Texto": return 'TEXT';
                case "Selección Multiple": return 'MULTIPLE_CHOICE';
            }
        }

        form["name"] = formData.get("form-name")

        let numberOfQuestions = 0;
        for(let key of formData.keys()) {

            const questionN = getNumbersAtEndOfString(key)

            numberOfQuestions = numberOfQuestions > questionN ? numberOfQuestions : questionN
        }

        numberOfQuestions += 1;


        form["questions"] = Array.from({length : numberOfQuestions}, () => ({}));


        for(let [key, value] of formData.entries()) {

            const questionArrayIndex = getNumbersAtEndOfString(key); 

            if(questionArrayIndex === -1) {
                continue;
            }
            
            switch(true) {
                case key.startsWith("question_type"):
                    form["questions"][questionArrayIndex]["type"] = getQuestionTypeEnumValue(value)
                break;
                case key.startsWith("question-text"):
                    form["questions"][questionArrayIndex]["question"] = value
                break;
                case key.startsWith("answer"):
                    if(form["questions"][questionArrayIndex]["possible_answers"]){
                        form["questions"][questionArrayIndex]["possible_answers"].push(value)
                    } else {
                        form["questions"][questionArrayIndex]["possible_answers"] = [value]
                    }
                break;
            }
        }

        for(let question of form["questions"]) {
            question["answers"] = []
        }

        return form;
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);

        try{
            await fetch(`${API_URL}/form/save`,
                {
                    method : "POST",
                    body : JSON.stringify(formDataToDesiredFormat(formData)),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }
            )


        }catch(error) {
            console.error(error)
        }

        navigate('/admin/form_list')

    }

    return (
        <>
        <LandingPageLogo text="Encuestas" src={UAMLogoWhite}/>
        <ContentContainer>
            <form onSubmit={handleSubmit}>
                <FormQuestion id="form-name">
                    Ingrese el nombre de su encuesta
                </FormQuestion>
                <MultipleEntry>
                    <AdminQuestion/>
                </MultipleEntry>
                <input type="submit" className="submit-button action-button" value="Crear"/>
            </form>
            <Link className="go-back-button" to="/admin/form_list">
                ←
            </Link>
        </ContentContainer>
        </>
    )
}

export default FormCreation
