import { useState } from 'react';
import { Box, } from '@mui/material';
import './playbookContent.css';
import GapView from '../gapPage/gap';
import ListView from '../ListView/ListView';
 
  
  // Main PlaybookContent Component
  const PlaybookContent = ({ items }) => {
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
  
    return (
      <Box className="playbook-content">
        {view === 'list' ? (
          <ListView items={items} onItemClick={handleItemClick} />
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
              content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services."
            },
            {
              type: "Media",
              content: "Full Funnel media activation to amplify the content and communication."
            },
            {
              type: "UX",
              content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages."
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
              type: "CX",
              content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services."
            },
            {
              type: "Media",
              content: "Full Funnel media activation to amplify the content and communication."
            },
            {
              type: "UX",
              content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages."
            }
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
              type: "CX",
              content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services."
            },
            {
              type: "Media",
              content: "Full Funnel media activation to amplify the content and communication."
            },
            {
              type: "UX",
              content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages."
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
                  content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services."
                },
                {
                  type: "Media",
                  content: "Full Funnel media activation to amplify the content and communication."
                },
                {
                  type: "UX",
                  content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages."
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
                  type: "SEO",
                  content: "Optimize website and content for search engines to compete more effectively."
                },
                {
                  type: "Media",
                  content: "Increase digital ad spend to capture more consideration-stage traffic."
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
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights."
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
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights."
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
                  content: "Develop a CRM tool for agents to provide a holistic customer view and insights."
                }
              ]
          },

      ];
    
    return(
        <PlaybookContent items={itemsData} />
    )
}
export default PlaybookContents;