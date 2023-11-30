import {useState, useEffect} from "react"
import { API_URL } from "./globals"
import ContentContainer from './ContentContainer'
import AdminNavbar from "./AdminNavbar"
import './EgresadoList.css'
import './Common.css'
import { useNavigate } from "react-router-dom"
import LogOutButton from "./LogOutButton"

const ToggleSwitch = ({isChecked, onToggle}) => {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <p>{isChecked ? 'Aprobados': 'Por Aprobar' }</p>
    </div>
  );
};


const EgresadoList = () => {

    const navigate = useNavigate()
    const [egresados, setEgresados] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [notApprovedView, setNotApprovedView] = useState(true)

    useEffect(() => {
        const fetchEgresados = async () => {
            try{
                const response = await fetch(`${API_URL}/egresado/all`)
                const data = await response.json()
                setEgresados(data)
            }catch(error) {
                console.error("Failed to load data : ", error)
            }finally {
                setIsLoading(false)
            }
        }

        setIsLoading(true)
        fetchEgresados();
    }, [])

    if(isLoading){
        return <div>Cargando...</div>
    }

    if(!egresados){
        return <div>No hay datos...</div>
    }

    const handleClick = (egresadoId) => {
        navigate(`/admin/egresado_view/${egresadoId}`)
    }

    const handleToggle = () => {
        setNotApprovedView(!notApprovedView);
    }

    const handleApprove = async (egresadoParam) => {
        
        try {
            const response = await fetch(`${API_URL}/egresado/getById?id=${egresadoParam.id}`);
            const egresado = await response.json(); 

            if(egresado["aprobado"] === false) {
                egresado["aprobado"] = true;
            }

            await fetch(`${API_URL}/egresado/save`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(egresado)
            })

            window.location.reload(false);
            
        } catch(error){
            console.error(error);
        }
    }

    const handleApproveAll = async () => {

        const unapproved = egresados.filter(egresado => !egresado.aprobado);
        const unapprovedIds = unapproved.map(egresado => egresado.id);
        console.log(unapprovedIds);

        try {
            await fetch(`${API_URL}/egresado/approveAll`, {
                method : "POST",
                headers :{
                    "Content-Type" : "application/json"
                }, 
                body : JSON.stringify(unapprovedIds)
            });

            window.location.reload(false);
            
        } catch(error){
            console.error(error);
        }


    }

    return (
        <>
        <AdminNavbar/>
        <ContentContainer>
            <table id="egresado-table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>CIF</th>
                        <th>Fecha Graduación</th>
                        <th>Cargo Actual</th>
                        <th>Número Telefónico</th>
                        <th>Correo</th>
                        <th>Carrera</th>
                        {
                            !notApprovedView &&
                        <th>Aprobar?</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        egresados.map(
                            (egresado,index) => 
                                (notApprovedView? egresado.aprobado : !egresado.aprobado) &&
                                <tr id={egresado.id} key={index} onClick={() => {
                                    if(notApprovedView) {
                                        handleClick(egresado.id)
                                    }
                                }}>
                                    <td>{`${egresado.primerNombre} ${egresado.segundoNombre}`}</td>
                                    <td>{`${egresado.primerApellido} ${egresado.segundoApellido}`}</td>
                                    <td>{`${egresado.cif}`}</td>
                                    <td>{`${egresado.fechaGraduacion}`}</td>
                                    <td>{`${egresado.cargoActual.posicionActual}`}</td>
                                    <td>{`${egresado.contactos[egresado.contactos.length - 1].numero}`}</td>
                                    <td>{`${egresado.correos[egresado.correos.length - 1].correo}`}</td>
                                    <td>{`${egresado.carreras[egresado.carreras.length - 1].carrera}`}</td>
                                    {
                                        !notApprovedView &&
                                    <td><button className="action-button submit-button" onClick={() => handleApprove(egresado)}>✓</button></td>
                                    }
                                </tr> 
                        )
                    }
                </tbody>
            </table>
        </ContentContainer>
        <ToggleSwitch onToggle={handleToggle} isChecked={notApprovedView}/>
        {
            !notApprovedView &&
            <button className="action-button submit-button" onClick={handleApproveAll}>Aprobar a todos</button> 
        }
        <LogOutButton isAdmin={true}></LogOutButton>
        </>
    )

}

export default EgresadoList;
