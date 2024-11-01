import { Box, Chip ,Menu, MenuItem} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import search_icon from '../asset/search_icon.svg';
import CloseIcon from '@mui/icons-material/Close';
import arrow from '../asset/back_icon.svg';
import { useState } from 'react';
import './chips.css'

// Define filter options
const filterOptions = {
    persona: ['New', 'Existing', 'Offline', 'Agent'],
    stage: ['Exploration', 'Consideration', 'Decision', 'Post-purchase'],
    dbt: ['CX', 'UX', 'Media', 'Creative', 'SEO'],
    actionable: ['All', '45 Days', '90 Days', '160 Days']
  };

  
const FilterChips = ({ selectedFilters, setSelectedFilters, activeView  }) => {

 // Add logic to select filters based on the active view
 const filtersToShow = activeView === 'gap' ? ['persona', 'stage', 'dbt'] : ['actionable', 'dbt'];
  const areFiltersSelected = Object.values(selectedFilters).some(
    (filterValues) => filterValues.length > 0
  );

    // Update filterOptions to title case when rendering
const titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();



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

  const handleFilterSelect = (value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [activeFilter]: [...(prev[activeFilter] || []), value] // Store as-is without converting to uppercase
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
      <Box className={`filter-chips-container ${activeView === 'gap' ? 'justify-space-between' : 'gap-only'}`}>
      {filtersToShow.map((filterType) => (
          <button
          key={filterType}
          className={`filter-chip ${activeFilter === filterType ? 'active' : ''}} ${selectedFilters[filterType] && selectedFilters[filterType].length > 0 ? 'selected' : ''}`}
          onClick={(e) => handleClick(e, filterType)}
        >
            {filterType === 'dbt' ? 'DBT' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          <svg className="chevron chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
        </button>
        ))}
        <button 
          className="search-chip">
         <img className='search-icon' src={search_icon} alt='search'/>
          </button>
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
                deleteIcon={<CloseIcon fontSize="small" sx={{fill:'#F37021',   transform: 'scale(0.7)', }}/>}
                className="selected-filter-chip" sx={{color:'#F37021',border: '1px solid #E2E2E2',height:'29px', fontFamily:'Poppins',fontSize:'14px'}}
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
            sx={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500' }}
          >
         {titleCase(option)}
          </MenuItem>
        ))}
      </Menu>
      
    </>
);
};
export default FilterChips;