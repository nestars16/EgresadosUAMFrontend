import {useState, useEffect} from "react"
import { API_URL } from "./globals";
import ContentContainer from "./ContentContainer";
import CardHeading from "./CardHeading";
import "./EgresadoView.css"
import "./FormView.css"
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { getEgresadoIdFromCookie } from "./UserNavbar";




const FormCard = ({form, isAdmin}) => {

    const getNumberOfAnswers = (questionsArray) => {
        
        let counter = 0;

        questionsArray.forEach((question) => {
            if(question.answers.length) {
                counter += question.answers.length;
            }
        }        
        )

        return counter;
    }

    let linkStr = ''

    if(isAdmin) {
        linkStr = `/admin/form_view/${form.id}`
    } else {
        linkStr = `/form_answer/${form.id}`
    }

    return (
        <Link className="form-card" to={linkStr}>
            <CardHeading>{form.name}</CardHeading> 
            <p>{getNumberOfAnswers(form.questions)} respuestas</p>
        </Link>
    )
    
}

const FormView = ({isAdmin}) => {

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
        <>
        { isAdmin ? <AdminNavbar/> : <UserNavbar/>
        }
        <ContentContainer className="main-container">
            <ul>
                {
                    forms.map(
                        (form,index)=> 
                        (isAdmin ? true : form["answersCollectedFrom"].every(id => id !== getEgresadoIdFromCookie(document.cookie))) &&
                        <FormCard isAdmin={isAdmin} className="form-container" key={index} form={form}/>
                    )
                }
            </ul>
        </ContentContainer>
        {
            isAdmin &&
            (
                <Link to="/admin/form_creation"className="anchor-button">
                    Crear
                </Link>
            )
        }
        <LogOutButton isAdmin={isAdmin}/>
        </>
    )
}

export default FormView;
