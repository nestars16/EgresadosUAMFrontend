import "./DropdownSelector.css" 
import React from "react"


const DropdownSelector = ({prompt,name,id, onChange, options}) => {
    return (
    <>
        <label className="dropdown-prompt" htmlFor={id}>{prompt}</label>
        <select name={name} id={id} className="drop-down" onChange={onChange}>
            {options.map((option , index)=> (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>    
    </>
    )
}

export default DropdownSelector
