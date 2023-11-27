import './AdminNavbar.css'
import { Link } from 'react-router-dom'


export const getEgresadoIdFromCookie = (cookie) =>{
    const regex =/egresadoId=([a-fA-F0-9]+)/ 
    let matches = cookie.match(regex)
    if(matches) {
        return matches[1]
    } else {
        return null
    }
}

const UserNavbar = () => {

    const id = getEgresadoIdFromCookie(document.cookie);
    let userLink = '/';

    if(id) {
        userLink = `/egresado_view/${id}`
    }

    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={userLink}>
                        Egresados
                    </Link> 
                </li>            
                <li>
                    <Link to="/form_list">
                        Encuestas
                    </Link> 
                </li>
            </ul>
        </nav>
    )
}

export default UserNavbar 
