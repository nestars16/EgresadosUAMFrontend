import FormField from './FormField'
import './FormQuestion.css'

const FormQuestion = ({id, children, ...props }) => {
    return (
        <>
        <label htmlFor={id}>
            <p className="question-text">{children}</p>
        </label>
        <FormField id={id} {...props}/>
        </>
    )
}

export default FormQuestion
