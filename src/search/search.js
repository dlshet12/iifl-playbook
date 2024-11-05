import search_icon from '../asset/search_icon.svg';
import './search.css';
import back from '../asset/back_icon.svg'
const Search = ({ onClose }) => {
    return (
        <div className="search-page-container">
        <div className="nav-back-search">
        <button className="back-button-search" onClick={onClose}>
          <img src={back} alt="Back" />
          <span>Search</span>
        </button>
      </div>
    
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search items..." />
          <button className="search-button">
            <img className='search-img' alt="Search" src={search_icon} />
          </button>
        </div>
      </div>
    );
  };
  
  export default Search;