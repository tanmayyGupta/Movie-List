import React, { useState } from "react";
import ReactDOM from "react-dom";
import jwt_decode from'jwt-decode';

const MODAL_STYLES = {
    position: 'fixed',
    width: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFA',
    padding: '50px',
    zIndex: 1000
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

function Modal({open, children, onClose}, props) {
    const [rating, setRating]  = useState(0);
    // const [listType, setListType] = useState(0);

    async function removeFromList(event) {
        event.preventDefault();

        const token = sessionStorage.getItem('token');
        const user = jwt_decode(token);
        const email = user.email;

        const obj = sessionStorage.getItem('movie');
        const movie = JSON.parse(obj);
        const id = movie.imdbID;

        const response = await fetch('http://localhost:8001/removeitem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, id,
            }),
        })

        const data = await response.json();
        console.log(data);
        
        // let alertmessage = '';
        // if (listType === 1) {
        //     alertmessage = "Watched";
        // } else {
        //     alertmessage = "Plan to Watch";
        // }

        // if(data.status === 'ok') {
        //     alert(movie.Title + " now added to your " + alertmessage + " list !")
        // }
        // else if(data.error.code === 11000){
        //     alert(movie.Title + " is already in your " + alertmessage + " list !")
        // }   
        
        setRating(0);
        onClose();
        window.location.reload(false);
    }
    if(!open) return null; // for modal opening & closing

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>

            <div style={MODAL_STYLES}>

                <input type="submit" value="Close Modal" onClick={onClose} />
                {children}
                
                 {/* onClick={() => props.handleClick(movie)} */}
                {/* <form onSubmit={addToList}>
                    <input 
                        type="text" 
                        placeholder="Rating(1 - 10)" 
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required/>
                    <input type="submit" value="Watched" onClick={() => {setListType(1)}}/>
                </form> */}

                <input type="submit" value="Remove from Watched List" onClick={removeFromList}/>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;