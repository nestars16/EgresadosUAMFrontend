import FormField from "./FormField"
import "./LogIn.css"
import "./Common.css"
import UAMLogo from "./assets/UAMLogo.png"
import ContentContainer from "./ContentContainer"

const LogIn = () => {
    return (
        <ContentContainer>
            <div className="image-container">
                <img className="logo-uam" src={UAMLogo}/>
            </div>
            <h1 className="heading">Iniciar sesión</h1>
            <form className="log-in">
                <FormField placeholder="Correo" type="input"/>
                <FormField placeholder="Contraseña" type="password"/>
            </form>
        </ContentContainer>
    )
}

export default LogIn
