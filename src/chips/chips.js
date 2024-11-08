import { useEffect, useRef, useState } from 'react';
import { Box, Chip ,Menu, MenuItem} from '@mui/material';
import search_icon from '../asset/search_icon.svg';
import CloseIcon from '@mui/icons-material/Close';
import './chips.css'


// Define filter options
const filterOptions = {
    actionable: ['All', '45 Days', '90 Days', '160 Days']
  };

  
const FilterChips = ({ selectedFilters, setSelectedFilters, activeView, onSearchClick,itemsData,onFiltersHeightChange  }) => {
  const selectedFiltersRef = useRef(null);
  const [filtersHeight, setFiltersHeight] = useState(0);

  useEffect(() => {
    if (selectedFiltersRef.current) {
      const height = selectedFiltersRef.current.offsetHeight;
      setFiltersHeight(height);
      onFiltersHeightChange(height); // Pass height to the parent component
    }
  }, [selectedFilters]); 

 // Add logic to select filters based on the active view
 const filtersToShow = activeView === 'gap' ? ['persona', 'stage', 'dbt'] : ['actionable', 'dbt'];
  const areFiltersSelected = Object.values(selectedFilters).some(
    (filterValues) => filterValues.length > 0
  );

      // Update filterOptions to title case when rendering
const titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // const titleCase = (str) => {
  //   return str
  //     .split(" ")
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
  //     .join(" ");
  // };



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
    setSelectedFilters((prev) => {
      // Check if the value is already selected
      const currentFilterValues = prev[activeFilter] || [];
      if (currentFilterValues.includes(value)) {
        return prev; // If already selected, return without making changes
      }
      // If not selected, add the new value
      return {
        ...prev,
        [activeFilter]: [...currentFilterValues, value]
      };
    });
    handleClose();
  };
  // Handle removing a selected filter
  const handleFilterRemove = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(v => v !== value)
    }));
  };

   // Extract unique values for dropdowns dynamically
   const getFilterOptions = (key) => {
    switch (key) {
      case 'persona':
        return [...new Set(itemsData.flatMap(item => item.personas))];
      case 'stage':
        return [...new Set(itemsData.map(item => item.category))];
        case 'dbt':
          // Return different DBT options based on active view
          if (activeView === 'gap') {
            return [...new Set(itemsData.flatMap(item => item.tags))];
          } else {
            // For progress view, get unique categories from statuses
            return [...new Set(itemsData.flatMap(item => 
              (item.statuses || []).map(status => status.category)
            ))];
          }
      case 'actionable':
        return filterOptions.actionable;
      default:
        return [];
    }
  };

    // Clear DBT filters when switching views
    useEffect(() => {
      setSelectedFilters(prev => ({
        ...prev,
        dbt: [] // Reset DBT filters when view changes
      }));
    }, [activeView]);

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
          className="search-chip" onClick={onSearchClick}>
         <img className='search-icon' src={search_icon} alt='search'/>
          </button>
        </Box>

      {/* Selected filter chips */}
      {areFiltersSelected && (
        <Box  ref={selectedFiltersRef} className="selected-filters-container">
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
        {activeFilter && getFilterOptions(activeFilter).map((option) => (
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