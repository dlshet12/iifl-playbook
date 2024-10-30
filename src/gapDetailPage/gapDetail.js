import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './gapDetail.css';
import back from '../asset/back_icon.svg';
import ActionDetailView from '../actionableDetailPage/actionableDeatil';

const DetailView = ({ section, onBack, item , activeTab: initialActiveTab }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab || item.tags[0]);
  const [prefix, personasText] = item.description.split('|');
  const [selectedActionable, setSelectedActionable] = useState(null);
  const [direction, setDirection] = useState(0);
    // Find the active section based on the current tab
    const activeSection = item.sections.find(s => s.type === activeTab) || section;

    const handleTabChange = (newTab) => {
      const currentIndex = item.tags.indexOf(activeTab);
      const newIndex = item.tags.indexOf(newTab);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveTab(newTab);
    };
  
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

    return (
      <div className="gap-detail-container">
        <div className="nav-back-gap-detail">
          
          <button className="back-button-gap"  onClick={onBack}>
          <img src={back} alt='back' />
          <div className='back-gap-title'>   {item.title}</div> 
          </button>

          
<div style={{backgroundColor:'white', paddingBottom:'8px'}}>
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

        </div>

<div style={{background:"white"}}>
  
        <div className="tab-switcher-container">
          <div className="tab-switcher">
            {item.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(tag)}
                className={`tab-button-gap ${activeTab === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        </div>
        </div>
        <div className="detail-content">

        {/* <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          > */}

          <div className="detail-section-solution">
            <div className="detail-header">
              <span className="detail-tag">Solution</span>
            </div>
            <div className="detail-body">
              <p>{activeSection.content}</p>
            </div>
          </div>
  
          <div className="detail-section-actionable">
      <div className="detail-header">
        <span className="detail-tag">ACTIONABLE'S</span>
      </div>
      <div className="detail-body">
        {activeSection.actionable.map((item, index) => (
          <div key={index} className="actionable-item" onClick={() => setSelectedActionable(item)}     style={{
            borderTop: index > 0 ? 'none' : '1px solid #CBCBCB'  // Apply top border only for the first item
          }}>
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

    {/* </motion.div>
        </AnimatePresence> */}
  
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