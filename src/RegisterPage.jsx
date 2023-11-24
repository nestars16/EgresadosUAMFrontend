import UAMLogoWhite from "./assets/UAMLogoWhite.png"
import LandingPageLogo from "./LandingPageLogo"
import ContentContainer from "./ContentContainer"
import DropdownSelector from  "./DropdownSelector"
import FormQuestion from "./FormQuestion"
import MultipleEntry from "./MultipleEntry"
import JobRegister from "./JobRegister"
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

    return (
        <>
            <LandingPageLogo text="Egresados" src={UAMLogoWhite}/>
            <ContentContainer>
                <h2 className="heading">¡Regístrate!</h2>
                <form className="register-form">
                    <FormQuestion id="first-name" type="text">
                        Ingresa tu(s) nombre(s) completo(s)
                    </FormQuestion>
                    <FormQuestion id="second-name" type="text">
                        Ingresa tu(s) apellido(s) completo(s)
                    </FormQuestion>
                    <FormQuestion id="second-name" type="text">
                        Ingresa tu cif
                    </FormQuestion>
                    <FormQuestion id="email" type="email" className="multiple-entry-field form-field">
                        Ingresa tu correo para tu cuenta
                    </FormQuestion>
                    <FormQuestion>
                        Ingresa tu contraseña
                    </FormQuestion>
                    <MultipleEntry>
                        <FormQuestion id="email" type="email" className="multiple-entry-field form-field">
                            Ingresa tu(s) correo electrónico(s) adicionales
                        </FormQuestion>
                    </MultipleEntry>
                    <MultipleEntry>
                        <FormQuestion id="phone" type="tel" className="multiple-entry-field form-field">
                                Ingresa tu número telefónico
                        </FormQuestion>
                    </MultipleEntry>
                    <FormQuestion id="birthday" type="date">
                        ¿Cuál es tu fecha de nacimiento?
                    </FormQuestion>
                    <DropdownSelector prompt={"¿Cuál es tu etnia?"} name="etnia" id="etnia" options={etnias}/>
                    <FormQuestion id="end-of-study" type="date">
                        ¿En qué fecha concluiste tus estudios más recientes en la UAM?
                    </FormQuestion>
                    <DropdownSelector prompt={"¿De qué carrera se egresó?"} name="carrera" id="carrera-principal" options={carreras}/>
                    <DropdownSelector prompt={"¿Se egresó de otra carrera?"} name="carrera2" id="carrera-secundaria" options={carreras}/>
                    <JobRegister></JobRegister>
                    <input type="submit" className="submit-button action-button"/>
                </form>
            </ContentContainer>
        </>
    )
}

export default RegisterPage 
