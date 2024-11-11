import React, { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import './playbookContent.css';
import GapView from '../gapPage/gap';
import ListView from '../ListView/ListView';
import FilterChips from '../chips/chips';
import axios from 'axios';
import Search from '../search/search';
import ProgressDetail from '../ProgressDetail/progressDetail';

// Main PlaybookContent Component
const PlaybookContent = ({ items, selectedFilters, activeView, setActiveView, view, setView, onItemClick,filtersHeight   }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('gap');
        if (onItemClick) {
          onItemClick();
        }
  };

  const handleBack = () => {
    setView('list');
    setSelectedItem(null);
    setSelectedStatus(null);
  };

  const handleStatusClick = (status, item, solutionNumber) => {
    // Find the index of the solution based on category and days
    const solutionIndex = parseInt(solutionNumber.split(' ')[1]) - 1;
    
    // Filter sections that match the category
    const matchingSections = item.sections.filter(section => section.type === status.category);
    
    // If we have multiple matching sections, pick the one corresponding to the solution number
    const targetSection = matchingSections[solutionIndex];
    
    if (targetSection) {
      // Filter actionable items that match the days and status
      // const filteredSection = {
      //   ...targetSection,
      //   actionable: targetSection.actionable.filter(actionable => 
      //     parseInt(actionable.days) === status.days && actionable.status === status.status
      //   )
      // };
      
      // const filteredSections = filteredSection.actionable.length > 0 ? [filteredSection] : [];
      
      setSelectedStatus({
        item,
        status,
        sections: [targetSection],
        solutionContent: targetSection.content || '',
        selectedDay: status.days 
      });
      setSelectedItem(item);
      setView('progressView');
    }
  };


   // Check if any filters are selected
   const areFiltersSelected = Object.values(selectedFilters).some(
    (filterValues) => filterValues.length > 0
  );

  const applyFilters = () => {
    return items.filter(item => {
      if (activeView === 'gap') {
        // Gap view filtering
        const personaMatch = selectedFilters.persona.length === 0 || 
          selectedFilters.persona.some(persona => item.personas.includes(persona));
        const stageMatch = selectedFilters.stage.length === 0 || 
          selectedFilters.stage.some(stage => stage.toLowerCase() === item.category.toLowerCase());
        const dbtMatch = selectedFilters.dbt.length === 0 || 
          selectedFilters.dbt.some(tag => item.tags.includes(tag));
        const actionableMatch = selectedFilters.actionable.length === 0 || 
          (item.statuses && selectedFilters.actionable.some(actionableDays => 
            item.statuses.some(status => status.days === parseInt(actionableDays))
          ));
  
        return personaMatch && stageMatch && dbtMatch && actionableMatch;
      } else {
        // Progress view filtering
        const dbtMatch = selectedFilters.dbt.length === 0 || 
          (item.statuses && item.statuses.some(status => 
            selectedFilters.dbt.includes(status.category)));
        const actionableMatch = selectedFilters.actionable.length === 0 || 
          (item.statuses && selectedFilters.actionable.some(actionableDays => 
            item.statuses.some(status => status.days === parseInt(actionableDays))
          ));
  
        return dbtMatch && actionableMatch;
      }
    });
  };

  // Filter the items before rendering
  const filteredItems = applyFilters();

  
  return (
    <Box className="playbook-content">

      {view === 'list' ? (
        <ListView items={filteredItems}
         onItemClick={handleItemClick} 
         handleStatusClick={handleStatusClick}
         hideTags={areFiltersSelected} 
         hideCategory={areFiltersSelected}
          activeView={activeView}
        setActiveView={setActiveView}
        selectedFilters={selectedFilters}
        filtersHeight={filtersHeight} />
      ) :  view === 'gap' ? (
        <GapView selectedItem={selectedItem}  onBack={handleBack} />
      ) : view === 'progressView' && (
        <ProgressDetail onBack={handleBack} selectedStatus={selectedStatus} />
      )
    }
    </Box>
  );
};


const PlaybookContents = () => {

  const [itemsData, setItemsData] = useState([]); 
  // State to track selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    persona: [],
    stage: [],
    dbt: [],
    actionable: [] 
  });
  const [activeView, setActiveView] = useState('gap');
  const [view, setView] = useState('list');
  const [showSearch, setShowSearch] = useState(false); 
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersHeight, setFiltersHeight] = useState(0);

  const handleFiltersHeightChange = (height) => {
    setFiltersHeight(height); // Update the filter height when it changes
  };


   // Fetch data from API
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://f1studioz.in/demo/iifl-playbook-wordpress/wp-json/gap/v1/list');
        setItemsData(response.data); // Update itemsData with API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());  
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setShowSearchResults(false);
    setSearchTerm(""); // Reset search term when closing search
};

const handleItemClick = () => {
  handleCloseSearch(); // Close search when an item is clicked
};

const filteredItems = itemsData.filter((item) => {
  const { category, title, tags, description, personas, statuses } = item;
  const [prefix, personasText] = description.split('|');
  
  // Search functionality
  let searchFields;
  if (activeView === 'gap') {
    searchFields = [category, title, prefix, personasText, ...(tags || []), ...(personas || [])];
  } else {
    // For progress view, include status categories in search
    const statusCategories = (statuses || []).map(status => status.category);
    searchFields = [title, prefix, ...(statusCategories || [])];
  }
  const searchMatch = searchTerm === "" || searchFields.some(field => 
    field && field.toLowerCase().includes(searchTerm)
  );

  // Filter logic based on active view
  if (activeView === 'gap') {
    // Gap view filtering
    const personaMatch = selectedFilters.persona.length === 0 || 
      selectedFilters.persona.some(persona => personas.includes(persona));
    const stageMatch = selectedFilters.stage.length === 0 || 
      selectedFilters.stage.some(stage => stage.toLowerCase() === category.toLowerCase());
    const dbtMatch = selectedFilters.dbt.length === 0 || 
      selectedFilters.dbt.some(tag => tags.includes(tag));
    const actionableMatch = selectedFilters.actionable.length === 0 || 
      (statuses && selectedFilters.actionable.some(actionableDays => 
        statuses.some(status => status.days === parseInt(actionableDays))
      ));

    return searchMatch && personaMatch && stageMatch && dbtMatch && actionableMatch;
  } else {
    // Progress view filtering
    const dbtMatch = selectedFilters.dbt.length === 0 || 
      (statuses && statuses.some(status => 
        selectedFilters.dbt.includes(status.category)
      ));
    const actionableMatch = selectedFilters.actionable.length === 0 || 
      (statuses && selectedFilters.actionable.some(actionableDays => 
        statuses.some(status => status.days === parseInt(actionableDays))
      ));

    // For progress view, we only return items that have matching statuses
    return searchMatch && dbtMatch && actionableMatch && 
      statuses && statuses.length > 0;
  }
});
      // Generate className for PlaybookContent container based on conditions
      const getPlaybookContentClassName = () => {
        if (showSearch && showSearchResults) {
            return 'playbook-content-container search-results-active';
        }
        return 'playbook-content-container';
    };
  return (
    <>
         {/* Conditionally render FilterChips based on view */}
      {view === 'list' && !showSearch  && (
        <FilterChips selectedFilters={selectedFilters}
         setSelectedFilters={setSelectedFilters} 
          activeView={activeView} 
          onSearchClick={() => setShowSearch(true)}
          itemsData={itemsData}
          onFiltersHeightChange={handleFiltersHeightChange}/>
      )}
      
      {showSearch && (
        <Search onClose={handleCloseSearch} 
           onSearch={handleSearch}   showResults={setShowSearchResults}/>
      ) }
         {(!showSearch || showSearchResults) && (
        <div className={getPlaybookContentClassName()}>
          {filteredItems.length > 0 ? (
            <PlaybookContent
              items={filteredItems}
              selectedFilters={selectedFilters}
              activeView={activeView}
              setActiveView={setActiveView}
              view={view}
              setView={setView}
              onItemClick={handleItemClick}
              filtersHeight={filtersHeight}
            />
          ) : (
            <div className='no-search-result'>
            
            </div>
          )}
            </div>
              )}
    </>
  )
}
export default PlaybookContents;