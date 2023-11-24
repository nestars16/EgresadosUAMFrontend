import "./LandingPageLogo.css"

const LandingPageLogo = ({text, src}) => {
    return (
    <>
        <h1 className="heading logo-text">{text}</h1>
        <img className="logo-img" src={src}></img>
    </>
    )
}

export default LandingPageLogo
