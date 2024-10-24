import { useState } from 'react';
import './gapDetail.css';
import ActionDetailView from '../actionableDetailPage/actionableDeatil';
const DetailView = ({ section, onBack, item , activeTab: initialActiveTab }) => {
  
  const [activeTab, setActiveTab] = useState(initialActiveTab || item.tags[0]);
  const [prefix, personasText] = item.description.split('|');

  const [selectedActionable, setSelectedActionable] = useState(null);
  

  if (selectedActionable) {
    return (
      <ActionDetailView 
        item={item} 
        section={section} 
        actionable={selectedActionable}
        onBack={() => setSelectedActionable(null)} 
      />
    );
  }

    return (
      <div className="gap-container">
        <div className="nav-back-gap-detail">
          <button className="back-button-gap" onClick={onBack}>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className='back-gap-title'>
            {item.title}
            </div>
          </button>

          <div className='header_content'>
          <div className="item-description-bg">
        {prefix}
        {personasText && (
          <>
            <span className="separator">|</span>
            <span className="personas">{personasText.trim()}</span>
          </>
        )}
      </div>
      <div className="category-badge-gap">
          {item.category}
        </div>
        </div>

        <div className="tab-switcher-container">
          <div className="tab-switcher">
            {item.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tag)}
                className={`tab-button ${activeTab === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        </div>
  
        <div className="detail-content">
          <div className="detail-section-solution">
            <div className="detail-header">
              <span className="detail-tag">Solution</span>
            </div>
            <div className="detail-body">
              <p>{section.content}</p>
            </div>
          </div>
  
          <div className="detail-section-actionable">
      <div className="detail-header">
        <span className="detail-tag">ACTIONABLE'S</span>
      </div>
      <div className="detail-body">
        {section.actionable.map((item, index) => (
          <div key={index} className="actionable-item" onClick={() => setSelectedActionable(item)}>
            <div className="day-indicator">
              <div className={`day-dot ${item.color}`}></div>
              <span className="day-text">{item.days} Days</span>
            </div>
            <svg className="chevron chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
          </div>
        ))}
      </div>
    </div>
  
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">Impact</span>
            </div>
            <div className="detail-body">
              <span>Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and service</span>
             
            </div>
          </div>


          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">Reference links</span>
            </div>
            <div className="detail-body">
              <span>Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and service</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default DetailView;  