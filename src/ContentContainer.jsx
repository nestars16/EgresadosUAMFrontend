import "./Common.css"
import "./ContentContainer.css"

const ContentContainer = ({children, className}) => {

    const fullClassName = `content-container ${className || ''}`

    return (
        <div className={fullClassName}>
            {children}
        </div>
    ) 
}

export default ContentContainer
