/* eslint-disable react/prop-types */
import "../Page/style.css"

function Comment({ item }) {

    const {text, color} = item;
    return(
        <div className="comment-wrapper">
            <div className="square" style={{backgroundColor: color}}></div>
            <div className="comment-text">{text}</div>
        </div>

    )
}
export default Comment;