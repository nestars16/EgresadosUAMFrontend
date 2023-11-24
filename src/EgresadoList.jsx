import {useState, useEffect} from "react"
import { API_URL } from "./globals"
import ContentContainer from './ContentContainer'
import './EgresadoList.css'

const EgresadoList = () => {

    const [egresados, setEgresados] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {
                        egresados.map(
                            egresado => 
                            <tr id={egresado.id}>
                                <td>{`${egresado.primerNombre} ${egresado.segundoNombre}`}</td>
                                <td>{`${egresado.primerApellido} ${egresado.segundoApellido}`}</td>
                                <td>{`${egresado.cif}`}</td>
                                <td>{`${egresado.fechaGraduacion}`}</td>
                                <td>{`${egresado.cargoActual.posicionActual}`}</td>
                                <td>{`${egresado.contactos[egresado.contactos.length - 1].numero}`}</td>
                                <td>{`${egresado.correos[egresado.correos.length - 1].correo}`}</td>
                                <td>{`${egresado.carreras[egresado.carreras.length - 1].carrera}`}</td>
                            </tr> 
                        )
                    }
                </tbody>
            </table>
        </ContentContainer>
    )

}

export default EgresadoList;
