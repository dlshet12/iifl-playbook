import React, {  } from 'react';
import { Box,Chip } from '@mui/material';
import './listView.css';
import ActionableView from '../actionableView/actionableView.js';
// ListItem Component with onClick handling
const ListItem = ({ item, onClick,hideTags, hideCategory }) => {
  
    const personasText = item.personas.join(', ');

   
     // Function to determine chip color based on whether it's in impact array
  const getChipColor = (tag) => {
    return item.impact.includes(tag) 
      ? '#FEDCAD' // Orange color for impact tags
      : '#BCE3FF'; // Default blue color for other tags
  };

    // Sort tags to show impact tags first
    const sortedTags = [...new Set(item.tags)].sort((a, b) => {
      const aIsImpact = item.impact.includes(a);
      const bIsImpact = item.impact.includes(b);
      if (aIsImpact && !bIsImpact) return -1;
      if (!aIsImpact && bIsImpact) return 1;
      return 0;
    });

    return(
      <div
      className="list-item"
      onClick={() => onClick(item)}
    >
      {!hideCategory && (
   <div className={`category-label ${item.category.toLowerCase()}`}>
   {item.category}
 </div>
      )}
      <div className="item-title">
        {item.title}
      </div>
      <div className="item-description">
      Personas Effected 
          <>
            <span className="separator">|</span>
            <span className="personas"> {personasText}</span>
          </>
      
      </div>
      {!hideTags && (
      <Box className="tags-container">
        {sortedTags.map((tag, index) => (
          <Chip key={index} label={tag} className='chip_tag'
           sx={{backgroundColor: getChipColor(tag), fontSize:'12px',fontWeight:'500', color:'#656565', padding:'4px 7px',fontFamily: 'Poppins'}} />
        ))}
      </Box>
      )}
    </div>
    )
  }


// ListView Component
const ListView = ({ items, onItemClick,hideTags, activeView, setActiveView,selectedFilters, hideCategory,filtersHeight,handleStatusClick }) => {
 
    // Check if any filters are selected
    const areFiltersSelected = Object.values(selectedFilters).some(
      (filterValues) => filterValues.length > 0
    );
    return(
      <Box  style={{ marginTop: areFiltersSelected ? filtersHeight + 10 : 0 }}  className={`list-container ${areFiltersSelected ? 'extra-margin-top' : ''}`}>
      <div className={`views-wrapper ${activeView === 'gap' ? 'slide-gap' : 'slide-actionable'}`}
      style={{ height: activeView === 'gap' ? '450vh' : 'auto' }}>
        <div className="view">
          <div className="scrollable-content">
            {items.map((item, index) => (
              <ListItem key={index} item={item} onClick={onItemClick} hideTags={hideTags}  hideCategory={hideCategory}/>
            ))}
          </div>
        </div>
        <div className="view">
          <div className="scrollable-content">
           <ActionableView items={items} selectedFilters={selectedFilters} handleStatusClick={handleStatusClick}/>
          </div>
        </div>
      </div>
      <Box className="button-container">
        <button
          className={`view-button ${activeView === 'gap' ? 'active' : ''}`}
          onClick={() => setActiveView('gap')}
        >
          VIEW BY GAP
        </button>
        <button
          className={`view-button ${activeView === 'actionable' ? 'active' : ''}`}
          onClick={() => setActiveView('actionable')}
        >
          VIEW BY PROGRESS
        </button>
      </Box>
    </Box>
  );
};

  export default ListView;