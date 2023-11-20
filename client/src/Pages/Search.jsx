/* eslint-disable no-unused-vars */
import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <div className='searchPage'>
      <div className="leftSearch">
        <form>
            <div className="search-term">
                <label>Search Term:</label>
                <input type="text" id='searchTerm' placeholder='search...'  />
            </div>
            <div className='type'>
                <label>TYPE:</label>
                <div className="typeOptions">
                    <input type="radio" id="all" name='type'/>
                    <span>RENT & SALE</span>
                </div>
                <div className="typeOptions">
                    <input type="radio" id="rent" name='type' />
                    <span>RENT</span>
                </div>
                <div className="typeOptions">
                    <input type="radio" id="sale" name='type' />
                    <span>SALE</span>
                </div>
                <div className="typeOptions">
                    <input type="checkbox" id="offer" />
                    <span>OFFER</span>
                </div>
            </div>

            <div className='type'>
                <label>AMENITIES:</label>
                <div className="typeOptions">
                    <input type="checkbox" id="parking" />
                    <span>PARKING</span>
                </div>
                <div className="typeOptions">
                    <input type="checkbox" id="furnished" />
                    <span>FURNISHED</span>
                </div>
            </div>

            <div className="sortDiv">
                <label>SORT:</label>
                <select id="sort_order">
                    <option>Price low to high</option>
                    <option>Price high to low</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
            </div>

            <button className='searchBtn'>Search</button>

        </form>
      </div>
      <div className="rightSearch">
        <h1>Listing Results:</h1>
      </div>
    </div>
  )
}

export default Search
