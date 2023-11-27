import "./Common.css"
import { useNavigate } from "react-router-dom"


const LogOutButton = ({isAdmin}) => {
    
    const navigate = useNavigate();

    const logOut = () => {
        document.cookie = 'egresadoId=';
        const toString = isAdmin? "/admin/login" : "/";
        navigate(toString);
    }

    return (
        <button className="action-button" onClick={logOut}>Cerrar sesión</button>
    )
}

export default LogOutButton;
