import React, { useState } from "react";
import YourListModal from './YourListModal.js'
import Table from 'react-bootstrap/Table';

const YourList = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Rating</th>
                </tr>
            </thead>
            </Table>
            {props.movies.map( (movie, index) => 
                <div>
                <Table>
                <tbody>
                    <tr>
                        <td><img 
                                src={movie.Poster} 
                                alt={movie.Title} 
                                // className="img-fluid"
                                // onClick={() => props.handleClick(movie)}
                                height="100px" 
                                onClick={() => {
                                    setIsOpen(true);
                                    sessionStorage.setItem('movie', JSON.stringify(movie))
                                    }
                                }>
                            </img>
                        </td>
                        <td>{movie.Title}</td>
                        <td>{movie.userRating}</td>
                    </tr>
                </tbody>

                </Table>
                </div>
            )}        
            <YourListModal open = {isOpen} onClose={() => setIsOpen(false)}>YourListModal Trial</YourListModal>    
        </>
    )
}

export default YourList;