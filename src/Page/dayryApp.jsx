import {useEffect, useState} from "react";

import Element from "../Components/element.jsx";
import Comment from "../Components/comment.jsx";

import "./style.css"

function DayryApp() {

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);
    const [itemName, setItemName] = useState('');
    const [itemComment, setItemComment] = useState('');
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [triggerDelete, setTriggerDelete] = useState(false);


    function addItem(event) {
        event.preventDefault();

        if (itemName) {
            setItems((prevItems) => {
                const newItem = {
                    name: itemName,
                    status: items.length === 0,
                    comment: [],
                    number: Math.floor(10000000 + Math.random() * 90000000)
                };
                return [...prevItems, newItem];
            });
            setItemName("");
        }
    }

    function addComment(event) {
        event.preventDefault();

        if (itemComment) {
            const newComment = {
                text: itemComment,
                color: selectedColor
            };

            const updatedItems = items.map((item) => {
                if (item.status) {
                    return {
                        ...item, comment: [...item.comment, newComment]
                    };
                }
                return item;
            });
            setItems(updatedItems);
            setItemComment('');
            setSelectedColor("#000000");
        }
    }

    function changeStatus(ind) {
        const updatedItems = items.map((item, index) => {
            if (ind === index) {
                return {...item, status: true};
            }
            return {...item, status: false};
        });
        setItems(updatedItems);

    }

    function updateStatus() {
        if (items.length > 0) {
            const updatedItems = [...items];
            if (!updatedItems.some((item) => item.status)) {
                updatedItems[updatedItems.length - 1].status = true;
                setItems(updatedItems);
            }
        }
    }

    function deleteItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);

        setItems(updatedItems);
        setTriggerDelete(true);
    }

    useEffect(() => {
        updateStatus();
        setTriggerDelete(false);
    }, [triggerDelete]);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items])

    return (
        <div className="wrapper">
            <div className="aside">
                <h2 className="aside-title">DAYRY APP</h2>
                <p className="aside-text">Comment with no sense</p>
            </div>
            <div className="content-wrapper">
                <div className="items-wrapper">
                    <h1 className="content-title">Items</h1>
                    <form className="form-wrapper" onSubmit={addItem}>
                        <input
                            className="input"
                            type="text"
                            placeholder="Type name here..."
                            value={itemName}
                            required={true}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <button className="button-items" type='submit'>Add New</button>
                    </form>

                    {items.length > 0 && items.map((item, index) => (
                        <Element key={index} delItem={() => deleteItem(index)} item={item}
                                 onClick={() => changeStatus(index)}/>
                    ))}
                </div>

                <div className="comments-wrapper">
                    {items.length < 1 && <h1 className="content-title">Comments #</h1>}

                    {items.map((item, index) => (
                        <div key={index}>
                            {item.status && <h1 className="content-title">Comments #{item.number}</h1>}
                            {item.status && item.comment.map((comment, commentIndex) => (
                                <Comment key={commentIndex} item={comment}/>
                            ))}
                        </div>
                    ))}

                    <form className="form-wrapper" onSubmit={addComment}>
                        <input
                            className="input-color"
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        />
                        <textarea
                            className="input input-comment"
                            placeholder="Type comment here..."
                            value={itemComment}
                            required={true}
                            onChange={(e) => setItemComment(e.target.value)}
                        />
                        <button className="button-comment" type='submit'>Add New</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default DayryApp;