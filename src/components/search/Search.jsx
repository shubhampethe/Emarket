import React, { useContext, useState } from 'react'
import './Search.css';
import { FiSearch } from 'react-icons/fi';
import MyContext from '../../context/data/myContext';

const Search = () => {
  // const select = document.getElementsByClassName('select')
  // // Get all of the select options.
  // const options = select.querySelectorAll('option');

  // // Iterate over the options and set their width to the width of their text content.
  // options.forEach((option) => {
  //   const textWidth = option.textContent.length * 8;
  //   option.style.width = `${textWidth}px`;
  // });

  const context = useContext(MyContext)
  const { mode, searchkey, setSearchkey, filterType, setFilterType,
    filterPrice, setFilterPrice, product } = context

  const [v, setV] = useState('');
  function changeHandler(event) {
    setV(event.target.value);
  }
  function submitHandler() {
    setSearchkey(v);
  }
  return (
    <div className='nav-search'>
      <select className='select text-black' style={{ cursor: 'pointer' }} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All</option>
        {product.map((item, index) => {
          return (
            <option key={index} value={item.category}>{item.category}</option>
          )
        })}
      </select>
      <input placeholder='Search' className='search-input' name="searchkey"
        // value={searchkey}
        onChange={changeHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            submitHandler();
        }}
      ></input>
      <div className='search-icon'>
        <button onClick={submitHandler} style={{ cursor: 'pointer' }}>
          <FiSearch></FiSearch>
        </button>
      </div>
    </div>
  )
}

export default Search





