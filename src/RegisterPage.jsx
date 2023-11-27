import UAMLogoWhite from "./assets/UAMLogoWhite.png"
import LandingPageLogo from "./LandingPageLogo"
import ContentContainer from "./ContentContainer"
import DropdownSelector from  "./DropdownSelector"
import FormQuestion from "./FormQuestion"
import MultipleEntry from "./MultipleEntry"
import JobRegister from "./JobRegister"
import { useNavigate} from "react-router-dom"
import {API_URL} from "./globals.js"
import "./Common.css"

const RegisterPage = () => {

    const carreras = [
        "N/A",
        "Derecho", "Diplomacia y Relaciones Internacionales",
        "Odontología", 
        "Marketing y Publicidad", "Diseño y Comunicación Visual", "Comunicación y Relaciones Públicas",
        "Administracíon de Empresas", "Negocios Internacionales", "Economía empresarial", "Contabilidad y Finanzas",
        "Ingeniería Industrial","Ingeniería Civil", "Ingeniería en Sistemas de Información", "Arquitectura"
        ]

    const etnias = [
        "Blanco",
        "Mestizo",
        "N/A"
    ]

    const navigate = useNavigate();

    const getJobs = (formData) => {
        let counter = 0
        let jobs = []

        let jobName;
        let startDate;
        let endDate;

        try {
            jobName = formData.get(`old-pos${counter}`)
            startDate = formData.get(`old-start-date${counter}`)
            endDate = formData.get(`old-end-date${counter}`)
        }catch(error) {
            if(error instanceof ReferenceError) {
                return jobs
            }
        }

        while(jobName && startDate && endDate){
            
            jobs.push(
                {
                    "posicionActual" : jobName,
                    "fechaInicio" : startDate,
                    "fechaTerminacion" : endDate
                }
            )

            counter += 1;

            try {
                jobName = formData.get(`old-pos${counter}`)
                startDate = formData.get(`old-start-date${counter}`)
                endDate = formData.get(`old-end-date${counter}`)
            }catch(error) {
                if(error instanceof ReferenceError) {
                    return jobs
                }
            }
        }

        return jobs
    }

    const  handleSubmit  = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const [firstName, secondName] = formData.get("first-name").split(' ');
        const [firstLastName, secondLastName] = formData.get("second-name").split(' ');

        const egresado = {
            "primerNombre" : firstName,
            "segundoNombre" : secondName,
            "primerApellido" : firstLastName,
            "segundoApellido"  : secondLastName,
            "fechaNacimiento" : formData.get("birthday"),
            "fechaGraduacion" : formData.get("end-of-study"),
            "cargoActual" : {
                "posicionActual" : formData.get("current-pos"),
                "fechaInicio" : formData.get("current-pos-start-date"),
                "fechaTerminacion" : ""
            },
            "password" : formData.get("password"),
            "contactos" : formData.getAll("phones"),
            "correos"  : formData.getAll("emails"),
            "cif" : formData.get("cif"),
            "logInEmail" : formData.get("logInEmail"),
            "trabajos" : getJobs(formData),
            "carreras" : [formData.get("carrera")],
            "etnia" : formData.get("etnia"),
            "aprobado" : false
        }

        if(formData.get("carrera2") !== "N/A") {
            egresado["carreras"].push(formData.get("carrera2"))
        }

        try {
            await fetch(`${API_URL}/egresado/save`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(egresado)
            })
        }catch(error) {
            console.error("failed to create egresado : ", error)
        }

        navigate("/")
    }

    return (
        <>
            <LandingPageLogo text="Egresados" src={UAMLogoWhite}/>
            <ContentContainer>
                <h2 className="heading">¡Regístrate!</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <FormQuestion name="first-name" type="text">
                        Ingresa tu(s) nombre(s) completo(s)
                    </FormQuestion>
                    <FormQuestion name="second-name" type="text">
                        Ingresa tu(s) apellido(s) completo(s)
                    </FormQuestion>
                    <FormQuestion name="cif" type="text">
                        Ingresa tu cif
                    </FormQuestion>
                    <FormQuestion name="logInEmail" type="email" className="multiple-entry-field form-field">
                        Ingresa tu correo para tu cuenta
                    </FormQuestion>
                    <FormQuestion id="password" type="password">
                        Ingresa tu contraseña
                    </FormQuestion>
                    <MultipleEntry>
                        <FormQuestion name="emails" type="email" className="multiple-entry-field form-field">
                            Ingresa tu(s) correo electrónico(s) adicionales
                        </FormQuestion>
                    </MultipleEntry>
                    <MultipleEntry>
                        <FormQuestion name="phones"  type="tel" className="multiple-entry-field form-field">
                                Ingresa tu número telefónico
                        </FormQuestion>
                    </MultipleEntry>
                    <FormQuestion name="birthday" type="date">
                        ¿Cuál es tu fecha de nacimiento?
                    </FormQuestion>
                    <DropdownSelector prompt={"¿Cuál es tu etnia?"} name="etnia" id="etnia" options={etnias}/>
                    <FormQuestion name="end-of-study" type="date">
                        ¿En qué fecha concluiste tus estudios más recientes en la UAM?
                    </FormQuestion>
                    <DropdownSelector prompt={"¿De qué carrera se egresó?"} name="carrera" id="carrera-principal" options={carreras}/>
                    <DropdownSelector prompt={"¿Se egresó de otra carrera?"} name="carrera2" id="carrera-secundaria" options={carreras}/>
                    <JobRegister/>
                    <input type="submit" className="submit-button action-button"/>
                </form>
            </ContentContainer>
        </>
    )
}

export default RegisterPage 
