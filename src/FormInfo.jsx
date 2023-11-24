import { API_URL } from "./globals"
import {useState, useEffect} from "react"
import ContentContainer from './ContentContainer'
import './Common.css'
import './FormInfo.css'

const FormInfo = ({id}) => {


    const [form, setForm] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchForm = async () => {
            setIsLoading(true) 
            try {
                const form = await fetch(`${API_URL}/form/getById?id=${id}`);
                const data = await form.json();
                setForm(data) 
            }catch(error) {
                console.error("failed to load forms: ", error);
            }finally{
                setIsLoading(false)
            }
        }

        fetchForm()
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!form){
        return <div>No forms...</div>
    }


    return (
        <ContentContainer className="form-questions">
            <h1 className="heading">{form.name}</h1>
            {
                form.questions.map((question) =>
                    <>
                    <h2>{question.question}</h2>
                    <ul>
                        {question.answers.map(
                            answer =>
                            <li>{answer}</li>
                        )
                        }
                    </ul>
                    </>
                )
            }
        </ContentContainer>
    )

}

export default FormInfo;
