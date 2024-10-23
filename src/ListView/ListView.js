import React, { useState } from 'react';
import { Box,Chip,Button } from '@mui/material';
import './listView.css'
// ListItem Component with onClick handling
const ListItem = ({ item, onClick }) => (
    <div
      className="list-item cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(item)}
    >
      <div className={`category-label ${item.category.toLowerCase()}`}>
        {item.category}
      </div>
      <div className="item-title">
        {item.title}
      </div>
      <div className="item-description">
        {item.description}
      </div>
      <Box className="tags-container">
        {item.tags.map((tag, index) => (
          <Chip key={index} label={tag} className='chip_tag' />
        ))}
      </Box>
    </div>
  );


// ListView Component
const ListView = ({ items, onItemClick }) => {
    const [activeView, setActiveView] = useState('gap');
    return(
    <Box className="list-container">
      <div className="scrollable-content">
        {items.map((item, index) => (
          <ListItem key={index} item={item} onClick={onItemClick} />
        ))}
      </div>
      <Box className="button-container">
        <Button    className={`view-button ${activeView === 'gap' ? 'active' : ''}`}
          onClick={() => setActiveView('gap')}>VIEW BY GAP</Button>
        <Button  className={`view-button ${activeView === 'actionable' ? 'active' : ''}`}
          onClick={() => setActiveView('actionable')}>VIEW BY ACTIONABLE</Button>
      </Box>
    </Box>
    )
}

  export default ListView;