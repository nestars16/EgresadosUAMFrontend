import './AdminNavbar.css'
import { Link } from 'react-router-dom'

const AdminNavbar = ({}) => {
    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/admin/egresado_list">
                        Egresados
                    </Link> 
                </li>            
                <li>
                    <Link to="/admin/form_list">
                        Encuestas
                    </Link> 
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavbar
