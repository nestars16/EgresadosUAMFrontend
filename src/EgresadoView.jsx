import ContentContainer from "./ContentContainer"
import "./EgresadoView.css"
import "./Common.css"
import MultipleEntry from "./MultipleEntry"
import {useEffect, useState} from 'react'
import { API_URL , clearField } from "./globals"
import CardHeading from "./CardHeading"
import DataRow from "./DataRow"
import DataInputRow from "./DataInputRow"


//TODO input fields for number and email
//TODO display labor info and add new position button
//TODO upload resume button
//


const JobInfo = ({header, hasEndDate, startDate, endDate, cargo, isReadOnly, id, onChange}) => {

    if(isReadOnly) {
        
        return (
            <>
                <DataInputRow readOnly={true} contentHeader={header} type="text" value={cargo}></DataInputRow>
                <DataRow contentHeader="Fecha de inicio" content={startDate}/>
                <DataRow contentHeader="Fecha de terminación" content={endDate}/>
            </>
        )

    } 

    return (
            <>
                <DataInputRow id={`jobName${id}`} onChange={onChange} contentHeader={header} type="text" value={cargo}></DataInputRow>
                <DataInputRow id={`startDate${id}`} onChange={onChange} contentHeader="Fecha Inicio" type="date" value={startDate}></DataInputRow>
                {hasEndDate && 
                <DataInputRow id={`endDate${id}`} onChange={onChange} contentHeader="Fecha terminación" type="date" value={endDate}></DataInputRow>
                }
            </>
        )
}

const EgresadoView = ({id}) => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldSave, setShouldSave] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/egresado/getById?id=${id}`);
                const data = await response.json();
                setUserData(data);
                setUserData(prevUserData => (
                    {
                        ...prevUserData,
                        id : id
                    }
                ))

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
      };

      fetchData();
    }, [id]);

    useEffect(() => {
        const saveEgresado = async () => {
            try {
                await fetch(`${API_URL}/egresado/save`,{
                    method : "PUT",
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify(userData)
                })
            } catch(e) {
                console.error("Failed to save user data");
            }
        }
        if(shouldSave) {
            saveEgresado().then(() => {
                setShouldSave(false)
            })
        }

    },[shouldSave, userData])

    

    const handleSave = () => {
        updateEgresado()
        setShouldSave(true)
    }

    const updateField = (field, newItem) => {
        setUserData(prevUserData => ({
                  ...prevUserData,
                  [field]: [...prevUserData[field], newItem]
              }));
    }
    
    const updateCurrentJob = () => {

        const position = document.getElementById("jobNameActual");
        const startDate = document.getElementById("startDateActual");

        const currentJob = 
        {
            "posicionActual" : position.value,
            "fechaInicio" : startDate.value,
            "fechaTerminacion " : null
        }

        setUserData(prevUserData => ({
            ...prevUserData,
            "cargoActual" : currentJob
        }));

    }

    const updateOldJobs = () => {

        const positions =  [...document.querySelectorAll("#jobNameOld")]  .map(elem => elem.value).filter(string => string) ;
        const startDates = [...document.querySelectorAll("#startDateOld")].map(elem => elem.value).filter(string => string) ;
        const endDates =   [...document.querySelectorAll("#endDateOld")]  .map(elem => elem.value).filter(string => string) ;

        [...document.querySelectorAll("#jobNameOld")].forEach((elem) => elem.value = '');
        [...document.querySelectorAll("#startDateOld")].forEach((elem) => elem.value = '');   
        [...document.querySelectorAll("#endDateOld")].forEach((elem) => elem.value = '');   


        if(positions.length != startDates.length || positions.length != endDates.length || endDates.length != startDates.length) {
            return;
        }

        const oldJobs = positions.map((position, index) => {

            if(!position || !startDates[index] || !endDates[index]) {
                return null;
            }

            return {
                "posicionActual" : position,
                "fechaInicio" : startDates[index],
                "fechaTerminacion" : endDates[index],
            }

        }).filter(job => job !== null)


        setUserData(prevState => ({
            ...prevState,
            "trabajos": [...prevState.trabajos, ...oldJobs]
        }))
    }


    const updateEgresado = () => {
        const phoneField = document.getElementById("phone");
        const emailField = document.getElementById("email");
        if(phoneField.value) {
            updateField("contactos",
                {
                    numero : phoneField.value
                }
            )
        }
        if(emailField.value) {
        updateField("correos",
            {
                correo :emailField.value
            }
        )
        }
        clearField(phoneField);
        clearField(emailField);
        updateOldJobs()
        updateCurrentJob()
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
        
    if (!userData) {
        return <div>No data available</div>;
    }

    return (
        <ContentContainer className="main-container">
            <ContentContainer className="sub-container">
                <CardHeading>Datos personales</CardHeading>
                    <div className="personal-data-fields-container">
                        <DataRow contentHeader="Nombre" content={`${userData.primerNombre} ${userData.segundoNombre}`}/>
                        <DataRow contentHeader="Apellido" content={`${userData.primerApellido} ${userData.segundoApellido}`}/>
                        <DataRow contentHeader="Fecha de nacimiento" content={(userData.fechaNacimiento)}/>
                        <DataRow contentHeader="Fecha de graduación" content={(userData.fechaGraduacion)}/>
                        <DataInputRow 
                            id="phone"
                            contentHeader="Numero Telefónico"
                            type="phone" placeholder={userData.contactos[userData.contactos.length - 1].numero}
                        >
                        </DataInputRow>
                        <DataInputRow 
                            id="email" 
                            contentHeader="Correo Electrónico" 
                            type="email" placeholder={userData.correos[userData.correos.length - 1].correo}
                        >
                        </DataInputRow>
                        {
                            userData.carreras.map((carreraObject, index) => 
                                <DataRow contentHeader="Carrera" key={index} content={carreraObject.carrera}/>
                            )
                        }
                    </div>
                </ContentContainer>
                <ContentContainer className="sub-container">
                    <CardHeading>Información Laboral</CardHeading>
                    <div className="job-data-fields-container">
                        <JobInfo header="Cargo Actual" id="Actual" cargo={userData.cargoActual.posicionActual} startDate={(userData.cargoActual.fechaInicio)}></JobInfo> 
                        {/* dummy div */} 
                        <div></div>
                        {
                            userData.trabajos.map((cargoObject, index) => (
                                <JobInfo isReadOnly={true} header="Nombre de cargo" key={index} cargo={cargoObject.posicionActual} startDate={(cargoObject.fechaInicio)} hasEndDate={true} endDate={(cargoObject.fechaTerminacion)}/>
                            ))
                        }
                        <MultipleEntry>
                            <JobInfo id="Old" header="Nombre de cargo" hasEndDate={true}></JobInfo>
                        </MultipleEntry>
                    </div>
            </ContentContainer>
            <button className="action-button submit-button save-button" onClick={handleSave}>💾</button>
        </ContentContainer>
    )
}


export default EgresadoView
