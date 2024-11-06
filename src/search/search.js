import { useState } from 'react';
import search_icon from '../asset/search_icon.svg';
import './search.css';
import back from '../asset/back_icon.svg'
const Search = ({ onClose, onSearch, showResults  }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
      onSearch(searchTerm);
      showResults(true); 
    };
    const handleClose = () => {
        setSearchTerm(""); 
        onSearch(""); 
        onClose(); 
    };
    return (
        <div className="search-page-container">
        <div className="nav-back-search">
        <button className="back-button-search" onClick={handleClose}>
          <img src={back} alt="Back" />
          <span>Search</span>
        </button>
      </div>
    
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search items..."   value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className="search-button" onClick={handleSearch}>
            <img className='search-img' alt="Search" src={search_icon} />
          </button>
        </div>
      </div>
    );
  };
  
  export default Search;