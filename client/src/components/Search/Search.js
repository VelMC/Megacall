import React from 'react';

export const Search = ({searchedValue, setSearchedValue, getContactName}) => {
    
    const onSearch = (e) => {
        setSearchedValue(e.target.value)
        e.preventDefault();
    }

    return <div>
        <input 
        type='text' 
        id='filter' 
        placeholder='Search'
        value={searchedValue} 
        onChange={onSearch}
        />
        <button onClick={() => getContactName()}>buscar</button>
    </div>;
};
