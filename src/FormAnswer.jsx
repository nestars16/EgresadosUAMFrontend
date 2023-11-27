import ContentContainer from './ContentContainer'
import CardHeading from "./CardHeading"
import "./FormView.css"
import "./Common.css"
import { useLoaderData } from 'react-router-dom'
import { API_URL } from './globals'
import { getEgresadoIdFromCookie } from './UserNavbar'
import { useNavigate } from 'react-router-dom'


const QuestionInput = ({question}) => {

    const isMultipleChoice = question.type === "MULTIPLE_CHOICE"

    if(!isMultipleChoice) {
        return(
            <div className="form-card">
                <CardHeading>{question.question}</CardHeading>
                <textarea name={question.question}className="form-field"></textarea>
            </div>
        )
    }
    
    return (
        <div className="form-card">
                <CardHeading>{question.question}</CardHeading>
                    {
                        question.possible_answers.map((answerChoice, index) => 
                            <div key={index}>
                                <label htmlFor={`q${index}`}>{answerChoice}</label>
                                <input id={`q${index}`} type="radio" name={question.question} value={answerChoice}/>
                            </div>
                        )
                    }
        </div>
    )

}

const FormAnswer = () => {

    const formInfo = useLoaderData();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const formResponse = await fetch(`${API_URL}/form/getById?id=${formInfo.id}`);
            const form = await formResponse.json();
            const formData = new FormData(e.target);

            form["questions"].forEach((question, index)=> {
                for(const key of formData.keys()) {
                    if(question.question === key) {
                        form["questions"][index]["answers"] = [...form["questions"][index]["answers"], ...formData.getAll(key)]
                    }
                }
            })

            form["answersCollectedFrom"].push(getEgresadoIdFromCookie(document.cookie))

            await fetch(`${API_URL}/form/save`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(form)
            });

            navigate("/form_list");

        }catch(error) {
            console.error(error);
        }

    }

    if(!formInfo) {
        return <div>No form...</div>
    }

    return (
        <ContentContainer>
            <form onSubmit={handleSubmit}>
                {
                    formInfo.questions.map((question ,index)=> 
                        <QuestionInput key={index} question={question}/>
                    ) 
                }
                <input type="submit" className="action-button submit-button" value="Enviar"/>
            </form>
        </ContentContainer>
    )

}

export default FormAnswer;
