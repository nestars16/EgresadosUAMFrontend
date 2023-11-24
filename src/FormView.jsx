import {useState, useEffect} from "react"
import { API_URL } from "./globals";
import ContentContainer from "./ContentContainer";
import CardHeading from "./CardHeading";
import "./EgresadoView.css"
import "./FormView.css"




const FormCard = ({form}) => {

    const getNumberOfAnswers = (questionsArray) => {
        
        let counter = 0;

        questionsArray.forEach((question) => 
            counter += question.answers.length
        )

        return counter;
    }


    return (
        <a className="form-card">
            <CardHeading>{form.name}</CardHeading> 
            <p>{getNumberOfAnswers(form.questions)} respuestas</p>
        </a>
    )
    
}

const FormView = () => {

    const [forms, setForms] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchForms = async () => {
            setIsLoading(true) 
            try {
                const forms = await fetch(`${API_URL}/form/all`);
                const data = await forms.json();
                setForms(data) 
            }catch(error) {
                console.error("failed to load forms: ", error);
            }finally{
                setIsLoading(false)
            }
        }

        fetchForms()
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!forms){
        return <div>No forms...</div>
    }


    return (
        <ContentContainer className="main-container">
            <ul>
                {
                    forms.map(
                        (form,index)=> 
                        <FormCard className="form-container" key={index} form={form}/>
                    )
                }
            </ul>
        </ContentContainer>
    )
}

export default FormView;
