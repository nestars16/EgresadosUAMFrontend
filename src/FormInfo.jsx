import { API_URL } from "./globals"
import { useLoaderData } from "react-router-dom"
import ContentContainer from './ContentContainer'
import './Common.css'
import './FormInfo.css'

export const getFormById = async (id) => {
    try {
        const form = await fetch(`${API_URL}/form/getById?id=${id}`);
        return await form.json();
    }catch(error) {
        return null;
    }
}


export async function formLoader({params}) {
    return await getFormById(params.formId);
}

export const FormInfo = () => {


    const form = useLoaderData();

    if(!form){
        return <div>No forms...</div>
    }

    return (
        <ContentContainer className="form-questions">
            <h1 className="heading">{form.name}</h1>
            {
                form.questions.map((question, index) =>
                    <div key={index}>
                        <h2>{question.question}</h2>
                        <ul>
                            {question.answers.map(
                                (answer, index)=>
                                <li key={index}>{answer}</li>
                            )
                            }
                        </ul>
                    </div>
                )
            }
        </ContentContainer>
    )

}

export default FormInfo;
