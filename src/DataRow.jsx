import "./DataRow.css"

const DataRow = ({contentHeader, content}) => {
    return (
        <>
            <div id="data-row-container" className="data-row-container">
                <div id="content-name" className="data-row-label">
                    <p className="label-text">{contentHeader}</p>
                </div>
                <div id="content" className="data-row-content">
                    <p className="content-text">{content}</p>
                </div>
            </div>
        </>
    )
}

export default DataRow;
