import { useState } from 'react';
import { Box, } from '@mui/material';
import './playbookContent.css';
import GapView from '../gapPage/gap';
import ListView from '../ListView/ListView';
 import FilterChips from '../chips/chips';
  
  // Main PlaybookContent Component
  const PlaybookContent = ({ items, selectedFilters }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [view, setView] = useState('list'); 
  
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setView('gap');
    };
  
    const handleBack = () => {
      setView('list');
      setSelectedItem(null);
    };

     // Function to apply the filters to the items list
  const applyFilters = () => {
    return items.filter(item => {
      // Check if the item matches the selected personas, stage, and DBT filters
      const personaMatch = selectedFilters.persona.length === 0 || selectedFilters.persona.some(persona => item.personas.includes(persona));
      const stageMatch = selectedFilters.stage.length === 0 || selectedFilters.stage.includes(item.category);
      const dbtMatch = selectedFilters.dbt.length === 0 || selectedFilters.dbt.some(tag => item.tags.includes(tag));

      return personaMatch && stageMatch && dbtMatch;
    });
  };

  // Filter the items before rendering
  const filteredItems = applyFilters();
  
    return (
      <Box className="playbook-content">
        {view === 'list' ? (
          <ListView items={filteredItems} onItemClick={handleItemClick} />
        ) : (
          <GapView selectedItem={selectedItem} onBack={handleBack} />
        )}
      </Box>
    );
  };
  

const PlaybookContents = () => {
    
          const itemsData = [ 
            {
              category: "EXPLORATION",
              title: "Lack of relevant and easily consumable information.",
              description: "Personas Effected | New, Existing, Offline",
              personas: ["New", "Existing", "Offline"],
              tags: ["CX", "Media", "Creative", "UX"],
              sections: [
                {
                  type: "CX",
                  content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
                  actionable: [
                    { days: 45, color: 'green' },
                    { days: 90, color: 'red' },
                    { days: 180, color: 'blue' }
                  ]
                },
                {
                  type: "Media",
                  content: "Full Funnel media activation to amplify the content and communication.",
                  actionable: [
                    { days: 15, color: 'yellow' },
                    { days: 190, color: 'red' },
                    { days: 18, color: 'orange' }
                  ]
                },
                {
                  type: "UX",
                  content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages.",
                  actionable: [
                    { days: 15, color: 'red' },
                    { days: 10, color: 'green' },
                    { days: 1, color: 'blue' }
                  ]
                }
              ]
            },
            {
              category: "EXPLORATION",
              title: "Insufficient TOMA.",
              description: "Personas Effected | New, Existing",
              personas: ["New", "Existing"],
              tags: ["Media", "Creative"],
              sections: [
                {
                  type: "Media",
                  content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 17, color: 'orange' },
                    { days: 6, color: 'blue' }
                  ]
                },
                {
                  type: "Creative",
                  content: "Full Funnel media activation to amplify the content and communication.",
                  actionable: [
                    { days: 52, color: 'green' },
                    { days: 13, color: 'orange' },
                    { days: 5, color: 'yellow' }
                  ]
                },
            
              ]
            },
            {
              category: "CONSIDERATION",
              title: "Enhanced competitor presence across digital touch-points.",
              description: "Personas Effected | Existing",
              personas: ["Existing"],
              tags: ["Media", "SEO", "UX"],
              sections: [
                {
                  type: "Media",
                  content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                },
                {
                  type: "SEO",
                  content: "Full Funnel media activation to amplify the content and communication.",
                  actionable: [
                    { days: 40, color: 'green' },
                    { days: 34, color: 'yellow' },
                    { days: 34, color: 'blue' }
                  ]
                },
                {
                  type: "UX",
                  content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages.",
                  actionable: [
                    { days: 20, color: 'green' },
                    { days: 40, color: 'red' },
                    { days: 10, color: 'blue' }
                  ]
                }
              ]
            },
          
        {
            category: "CONSIDERATION",
            title: "Lack of integrated tools to help agents/call centre with cohesive insights for better customer understanding thus reducing manual process and TAT..",
            description: "Personas Effected |  New, Existing, Offline, Agent",
            personas: ["New","Existing", "Offline" ,"Agent"],
            tags: ["CX", "Data", "UX"],
            sections: [
                {
                  type: "CX",
                  content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
                  actionable: [
                    { days: 20, color: 'green' },
                    { days: 40, color: 'red' },
                    { days: 10, color: 'blue' }
                  ]
                },
                {
                  type: "Data",
                  content: "Full Funnel media activation to amplify the content and communication.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                },
                {
                  type: "UX",
                  content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                }
              ]
          },
          {
            category: "CONSIDERATION",
            title: "Lack of self-qualification tool available.",
            description: "Personas Effected |  Existing, Offline",
            personas: ["Existing", "Offline"],
            tags: [ "UX","Data", ],
            sections: [
                {
                  type: "UX",
                  content: "Optimize website and content for search engines to compete more effectively.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                },
                {
                  type: "Data",
                  content: "Increase digital ad spend to capture more consideration-stage traffic.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                }
              ]
          },
          {
            category: "APPLICATION",
            title: "Non-Intuitive Online Forms Requiring Excessive Manual Entry.",
            description: "Personas Effected |  New, Existing, Offline, Agent",
            personas: ["New","Existing", "Offline", "Agent"],
            tags: [ "CX","Innovation", ],
            sections: [
                {
                  type: "CX",
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
               actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ] 
                },
                {
                  type: "Innovation",
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
               actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ] 
                }
              ]
          },
          {
            category: "APPLICATION",
            title: "Insufficient real-time application updates and proactive communication",
            description: "Personas Effected |  New, Existing, Offline, Agent",
            personas: ["New","Existing", "Offline", "Agent"],
            tags: [ "Data","UX","Innovation", ],
            sections: [
                {
                  type: "CX",
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                }
              ]
          },
          {
            category: "VERIFICATION",
            title: "Insufficient real-time application updates and proactive communication",
            description: "Personas Effected |  New, Existing, Offline, Agent",
            personas: ["New","Existing", "Offline", "Agent"],
            tags: [ "Data","UX","Innovation", ],
            sections: [
                {
                  type: "CX",
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
                  actionable: [
                    { days: 10, color: 'yellow' },
                    { days: 55, color: 'red' },
                    { days: 4, color: 'orange' }
                  ]
                }
              ]
          },

      ];

        // State to track selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    persona: [],
    stage: [],
    dbt: []
  });
    
    return(
      <>
      {/* FilterChips component to manage selected filters */}
      <FilterChips selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      
      {/* Pass selectedFilters to PlaybookContent */}
      <PlaybookContent items={itemsData} selectedFilters={selectedFilters} />
    </>
    )
}
export default PlaybookContents;