import {useState, useEffect} from "react"
import { API_URL } from "./globals"
import ContentContainer from './ContentContainer'
import CardHeading from "./CardHeading"
import "./FormView.css"
import "./Common.css"


const QuestionInput = ({question}) => {

    const isMultipleChoice = question.type === "MULTIPLE_CHOICE"

    if(!isMultipleChoice) {
        return(
            <div className="form-card">
                <CardHeading>{question.question}</CardHeading>
                <textarea className="form-field"></textarea>
            </div>
        )
    }
    
    return (
        <div className="form-card">
                <CardHeading>{question.question}</CardHeading>
                    {
                        question.possible_answers.map((answerChoice, index) => 
                            <div>
                                <label htmlFor={`q${index}`}>{answerChoice}</label>
                                <input id={`q${index}`} type="radio" name={question.question} value={answerChoice}/>
                            </div>
                        )
                    }
        </div>
    )

}

const FormAnswer = ({id}) => {

    const [formInfo, setFormInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
        const fetchFormInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/form/getById?id=${id}`);
                const data = await response.json();
                setFormInfo(data)
            }catch(error) {
                console.error("Failed to load form data", error)
            }finally {
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        fetchFormInfo()
    },[])

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!formInfo) {
        return <div>No form...</div>
    }

    return (
        <ContentContainer>
            <form>
                {
                    formInfo.questions.map((question ,index)=> 
                        <QuestionInput key={index}question={question}/>
                    ) 
                }
                <input type="submit" className="action-button submit-button" value="Enviar"/>
            </form>
        </ContentContainer>
    )

}

export default FormAnswer;
