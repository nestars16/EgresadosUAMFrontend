import FormField from './FormField'
import './FormQuestion.css'

const FormQuestion = ({id, children, index, ...props }) => {

    let idString = id;

    if(index) {
        idString += index;
    }

    return (
        <>
        <label htmlFor={id}>
            <p className="question-text">{children}</p>
        </label>
        <FormField id={id} name={`${idString}`} {...props}/>
        </>
    )
}

export default FormQuestion
