import { useState , useEffect} from "react";
import "./DataRow.css"

const DataInputRow = ({contentHeader, type, children, placeholder, readOnly, id, onChange,value}) => {

    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        handleBlur(
            {
                "target" : {
                    "value" : false
                }
            }
        )
    }, []
    )

    const handleFocus = () => {
        if (type === 'date') {
            setInputType('date');
        }
    };

    const handleBlur = (e) => {
        if (type === 'date' && !e.target.value) {
            setInputType('text');
        }
    };

    return (
            <div id="data-row-container" className="data-row-container">
                <div id="content-name" className="data-row-label">
                    <p className="label-text">{contentHeader}</p>
                </div>
                <div id="content" className="data-input-container" style={{width: 75 + '%'}}>
                    <input type={inputType} id={id} defaultValue={value}onFocus={handleFocus} onBlur={handleBlur} onChange={onChange}readOnly={readOnly} placeholder={inputType === 'text' || inputType === 'email' || inputType === 'phone'? placeholder : ''} className="form-field data-input"/>
                    {children}
                </div>
            </div>
        )
}

export default DataInputRow;
