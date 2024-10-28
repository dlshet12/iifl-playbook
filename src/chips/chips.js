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
    dbt: ['CX', 'UX', 'Media', 'Creative', 'SEO'],
    actionable: ['All', '45 Days', '90 Days', '160 Days']
  };

  
const FilterChips = ({ selectedFilters, setSelectedFilters, activeView  }) => {

 // Add logic to select filters based on the active view
 const filtersToShow = activeView === 'gap' ? ['persona', 'stage', 'dbt'] : ['actionable', 'dbt'];
  const areFiltersSelected = Object.values(selectedFilters).some(
    (filterValues) => filterValues.length > 0
  );

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
    [activeFilter]: [...(prev[activeFilter] || []), value] // Initialize with empty array if undefined
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
      {filtersToShow.map((filterType) => (
          <Chip
            key={filterType}
            sx={{ padding: '8px 10px', border: '1px solid #E2E2E2' }}
            label={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            deleteIcon={<KeyboardArrowDownIcon />}
            onDelete={() => {}}
            onClick={(e) => handleClick(e, filterType)}
            variant="outlined"
            className={`filter-chip ${activeFilter === filterType ? 'active' : ''}`}
          />
        ))}
        <div 
          className="search-chip">
         <img className='icon' src={search_icon} alt='search'/>
          </div>
        
      </Box>

      {/* Selected filter chips */}
      {areFiltersSelected && (
        <Box className="selected-filters-container">
          {Object.entries(selectedFilters).map(([filterType, values]) =>
            values.map((value) => (
              <Chip variant="outlined"
                key={`${filterType}-${value}`}
                label={value}
                onDelete={() => handleFilterRemove(filterType, value)}
                deleteIcon={<CloseIcon fontSize="small" sx={{fill:'#F37021'}}/>}
                className="selected-filter-chip" sx={{color:'#F37021', borderColor:'#F37021',marginRight:'10px'}}
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