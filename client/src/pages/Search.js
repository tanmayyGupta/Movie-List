import React, { useEffect, useState } from "react";
import jwt_decode from'jwt-decode';

// import MovieList from "./MovieList";
// import UpdatedMovieList from "./UpdatedMovieList";
import SearchBox from "./SearchBox";
import MainMovieList from "./MainMovieList";

function Search () {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6148c1c8`;

        const response = await fetch(url);

        const responseJson = await response.json();
        // console.log(responseJson);

        if(responseJson.Search) {
            setMovies(responseJson.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue);
        // eslint-disable-next-line
    }, [searchValue]);


    //sending movie/series details to backend:
    async function addToList(movie) {
        const token = sessionStorage.getItem('token');
        const user = jwt_decode(token);
        const email = user.email;

        const response = await fetch('http://localhost:8001/newentry/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                movie
            }),
        })
        console.log(movie);

        const data = await response.json();
        // console.log(data);

        if(data.status === 'ok') {
            alert(movie.Title + " now added to your list !")
        }
        else if(data.error.code === 11000){
            alert(movie.Title + " is already in your list !")
        }
    }


    return (
        <>
            <div className="container-fluid">
                <h3 className="text-gray-700 pt-8 pb-2 md:pt-16 md:pb-2">Search for any Movie/Series Title</h3>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className="d-flex row">
                {/* <MovieList movies = {movies} handleClick = {addToList}/> */}
                <MainMovieList movies = {movies} handleCllick = {addToList}/>
            </div>
        </>
    )
}

export default Search;