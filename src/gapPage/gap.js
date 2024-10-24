import { useState } from 'react';
import { Button } from '@mui/material';
import { Box,Chip } from '@mui/material';
import './gap.css';
import back from '../asset/back_icon.svg';
import DetailView from '../gapDetailPage/gapDetail';
// GapView Component
const GapView = ({ selectedItem, onBack }) => {
  const [selectedSection, setSelectedSection] = useState(null);

  const [activeTab, setActiveTab] = useState(null);

  const defaultItem = {
    category: "EXPLORATION",
    title: "Lack of relevant and easily consumable information.",
    personas: ["New", "Existing", "Offline"],
    tags: ["CX", "Media", "Creative", "UX"],
    sections: [
      {
        type: "CX",
        content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services"
      },
      {
        type: "Media",
        content: "Full Funnel media activation to amplify the content and communication"
      },
      {
        type: "UX",
        content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages."
      }
    ]
  };
  const item = selectedItem || defaultItem;

       // Function to determine chip color based on whether it's in impact array
       const getChipColor = (tag) => {
        return item.impact.includes(tag) 
          ? '#FEDCAD' // Orange color for impact tags
          : '#BCE3FF'; // Default blue color for other tags
      };
    
        // Sort tags to show impact tags first
        const sortedTags = [...item.tags].sort((a, b) => {
          const aIsImpact = item.impact.includes(a);
          const bIsImpact = item.impact.includes(b);
          if (aIsImpact && !bIsImpact) return -1;
          if (!aIsImpact && bIsImpact) return 1;
          return 0;
        });

  if (selectedSection) {
    return <DetailView item={item} section={selectedSection}   activeTab={selectedSection.type}  onBack={() => setSelectedSection(null)} />;
  }

  const [prefix, personasText] = item.description.split('|');
  return (
    <div className="gap-container">
      <div className='nav-back'>
        <Button className="back-button" onClick={onBack}>
           <img src={back} alt='back' />
          Gap
        </Button>
      </div>

      <div className="persona_card">
        <div className="category-badge">
          {item.category}
        </div>

        <h2 className="gap-title">
          {item.title}
        </h2>

        <div className="item-description">
        {prefix}
        {personasText && (
          <>
            <span className="separator">|</span>
            <span className="personas">{personasText.trim()}</span>
          </>
        )}
      </div>
      <Box className="tags-container">
        {sortedTags.map((tag, index) => (
          <Chip key={index} label={tag} className='chip_tag' sx={{backgroundColor: getChipColor(tag), fontSize:'12px',fontWeight:'500', color:'#656565', padding:'4px 7px'}} />
        ))}
      </Box>
      </div>
      <div className="sections-container">
        {item.sections && item.sections.length > 0 ? (
          item.sections.map((section, index) => (
            <div key={index} className="section-card" onClick={() => {
              setSelectedSection(section);
              setActiveTab(section.type);
            }}>
              <div className="section-header">
                <span className="section-type">{section.type}</span>
                <svg className="chevron chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <p className="section-content">
                {section.content}
              </p>
            </div>
          ))
        ) : (
          <p>No sections available</p>
        )}
      </div>


    </div>
  );
};
export default GapView;