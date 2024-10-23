import { Box, Chip ,Menu, MenuItem} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import search_icon from '../asset/search_icon.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import './chips.css'

// Define filter options
const filterOptions = {
    persona: ['New', 'Existing', 'Offline', 'Agent'],
    stage: ['Exploration', 'Consideration', 'Decision', 'Post-Purchase'],
    dbt: ['CX', 'UX', 'Media', 'Creative', 'SEO']
  };

const FilterChips = () => {

     // State for managing selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    persona: [],
    stage: [],
    dbt: []
  });

  // State for managing menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  // Handle main filter chip click
  const handleClick = (event, filterType) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filterType);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
  };

  // Handle selecting a filter option
  const handleFilterSelect = (value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [activeFilter]: [...prev[activeFilter], value]
    }));
    handleClose();
  };

  // Handle removing a selected filter
  const handleFilterRemove = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(v => v !== value)
    }));
  };

  return (
    <>
      {/* Main filter chips */}
      <Box className="filter-chips-container">
        <Chip sx={{padding:'8px 10px',border: '1px solid #E2E2E2'}}
          label="Persona"
          deleteIcon={<KeyboardArrowDownIcon />}
          onDelete={() => {}}
          onClick={(e) => handleClick(e, 'persona')}
          variant="outlined"
          className={`filter-chip ${activeFilter === 'persona' ? 'active' : ''}`}
        />
        <Chip sx={{padding:'8px 10px',border: '1px solid #E2E2E2'}}
          label="Stage"
          deleteIcon={<KeyboardArrowDownIcon />}
          onDelete={() => {}}
          onClick={(e) => handleClick(e, 'stage')}
          variant="outlined"
          className={`filter-chip ${activeFilter === 'stage' ? 'active' : ''}`}
        />
        <Chip sx={{padding:'8px 10px', border: '1px solid #E2E2E2' }}
          label="DBT"
          deleteIcon={<KeyboardArrowDownIcon />}
          onDelete={() => {}}
          onClick={(e) => handleClick(e, 'dbt')}
          variant="outlined"
          className={`filter-chip ${activeFilter === 'dbt' ? 'active' : ''}`}
        />
        <div 
          className="search-chip">
         <img className='icon' src={search_icon} alt='search'/>
          </div>
        
      </Box>

      {/* Selected filter chips */}
      {Object.entries(selectedFilters).some(([_, values]) => values.length > 0) && (
        <Box className="selected-filters-container">
          {Object.entries(selectedFilters).map(([filterType, values]) =>
            values.map((value) => (
              <Chip
                key={`${filterType}-${value}`}
                label={value}
                onDelete={() => handleFilterRemove(filterType, value)}
                deleteIcon={<CloseIcon fontSize="small" />}
                className="selected-filter-chip"
              />
            ))
          )}
        </Box>
      )}

      {/* Filter options menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="filter-menu"
      >
        {activeFilter && filterOptions[activeFilter].map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleFilterSelect(option)}
            className="filter-menu-item"
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
);
};
export default FilterChips;