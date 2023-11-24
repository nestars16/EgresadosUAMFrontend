import "./CardHeading.css"


const CardHeading = ({children}) => {
    return (
        <>
        <div>
            <h3 className="card-heading">{children}</h3>
        </div>
        <hr className="separator"></hr>
        </>
    )
}

export default CardHeading;
