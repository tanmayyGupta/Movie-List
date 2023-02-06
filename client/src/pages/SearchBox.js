import React from "react";

const SearchBox = (props) => {
    return (
        <>
            <input 
                type="search" 
                placeholder="Search for any movie"
                value={props.value}
                onChange={(e) => props.setSearchValue(e.target.value)}
                autoFocus
                className="relative block w-1/2 appearance-none rounded-md 
                            border-indigo-300 px-3 py-2 text-gray-900 
                            placeholder-gray-500 focus:z-10 focus:border-indigo-500
                            focus:outline-none focus:ring-indigo-500 sm:text-lg mx-auto my-4 active:bg-white"
                >
            </input>
        </>
    )
}

export default SearchBox;