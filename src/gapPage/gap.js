import {useState} from 'react';
import { Button } from '@mui/material';
import './gap.css';
import DetailView from '../gapDetailPage/gapDetail';
// GapView Component
const GapView = ({ selectedItem, onBack }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const defaultItem = {
        category: "EXPLORATION",
        title: "Lack of relevant and easily consumable information.",
        personas: ["New", "Existing", "Offline"],
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

      if (selectedSection) {
        return <DetailView section={selectedSection} onBack={() => setSelectedSection(null)} />;
      }

      return (
        <div className="gap-container">
         <div className='nav-back'>
         <Button className="back-button" onClick={onBack}>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
    
          <div className="personas-container">
            {item.personas?.map((persona, index) => (
              <span key={index} className="persona-tag">
                {persona}
              </span>
            ))}
          </div>
          </div>
          <div className="sections-container">
  {item.sections && item.sections.length > 0 ? (
    item.sections.map((section, index) => (
      <div key={index} className="section-card"    onClick={() => setSelectedSection(section)}>
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