import FormField from "./FormField"
import "./LogIn.css"
import "./Common.css"
import UAMLogo from "./assets/UAMLogo.png"
import ContentContainer from "./ContentContainer"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { API_URL } from "./globals"
import { getEgresadoIdFromCookie } from "./UserNavbar"
import { Link } from "react-router-dom"

//13

const LogIn = ({isAdmin}) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(id && !isAdmin) {
            navigate(`/egresado_view/${id}`)
        }
    }, [])


    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);

        const apiUrl = isAdmin? `${API_URL}/administrador/login` : `${API_URL}/egresado/login`;

        try {
            const response = await fetch(apiUrl, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email : formData.get("email"), password : formData.get("password")}),
                credentials: 'include'
            })

            const idStr = await response.text()

            console.log("idStr = ", idStr);

            if(idStr){
                if(!isAdmin) {
                    document.cookie = `egresadoId=${idStr}`;
                }
                const toString = isAdmin ? `/admin` : `/egresado_view/${idStr}`
                navigate(toString)
            }

        }catch(error) {
            console.error(error)
        }
    }

    const id = getEgresadoIdFromCookie(document.cookie)

    return (
        <>
        <ContentContainer>
            <div className="image-container">
                <img className="logo-uam" src={UAMLogo}/>
            </div>
            <h1 className="heading">Iniciar sesión</h1>
            <form className="log-in" onSubmit={handleSubmit}>
                <FormField name="email" placeholder="Correo" type="input"/>
                <FormField name="password" placeholder="Contraseña" type="password"/>
                <input type="submit" className="action-button submit-button"/>
            </form>
            {
                isAdmin ?
                <Link to="/" className="grey-text heading">
                    ¿Eres usuario?
                </Link>
                : (
                <>
                <Link to="/admin/login" className="grey-text heading">
                    ¿Eres administrador?
                </Link>
                <Link to="/register" className="grey-text heading">
                        ¿No tienes una cuenta?
                </Link>
                </>
                )
            }
        </ContentContainer>
        </>

    )
}

export default LogIn
