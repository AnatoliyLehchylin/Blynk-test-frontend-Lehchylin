/* eslint-disable react/prop-types */
import "../Page/style.css"

function Element({ item, onClick, delItem }) {

    const {name, comment, status} = item;
    return(
        <div className={"element-wrapper " + (status ? "active" : "")}>
            <div className="name-wrapper" onClick={onClick}>
                <div>{name}</div>
                <span className="span">{comment.length}</span>
            </div>
            <button className="button-delete" type='button' onClick={delItem}>DELETE</button>
        </div>

    )
}
export default Element;