import React from 'react'

const SearchBlog = ({search, handleSearchChange, handleSearch }) => {

    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            handleSearch()
        }
    }

  return (
    <div className='w-full h-15 flex rounded-xl shadow-lg'>
        <input type="text" 
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder='Search...'
        className='py-2 px-4  mr-5 w-full bg-white focus:outline-none focus:border rounded-xl'/>
        <button
        onClick={handleSearch} className='bg-blue-800 px-10 py-2 text-white rounded'>Search</button>
    </div>
  )
}

export default SearchBlog