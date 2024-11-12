import React, {useEffect, useRef, useState } from 'react';
import './gapDetail.css';
import back from '../asset/back_icon.svg';
import ActionDetailView from '../actionableDetailPage/actionableDeatil';

const DetailView = ({ section, onBack, item, activeTab: initialActiveTab }) => {

  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    // Set initial height
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    // Update height when window resizes or data changes
    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [activeTab, setActiveTab] = useState(initialActiveTab || item.tags[0]);

  const [selectedActionable, setSelectedActionable] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(null); 

  const [direction, setDirection] = useState(0);

  const [isExpandedArray, setIsExpandedArray] = useState(
    Array(item.sections.length).fill(true)
  );

  const uniqueTags = Array.from(new Set(item.tags));

  const activeSections = item.sections.filter(s => s.type === activeTab);

  const handleTabChange = (newTab) => {
    const currentIndex = item.tags.indexOf(activeTab);
    const newIndex = item.tags.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const personasText = item.personas.join(', ');

  const toggleAccordion = (index) => {
    setIsExpandedArray((prev) => {
      const newExpandedState = [...prev];
      newExpandedState[index] = !newExpandedState[index];
      return newExpandedState;
    });
  };

  if (selectedActionable) {
    return (
      <ActionDetailView
        item={item}
        section={section}
        actionable={selectedActionable}
        solutionIndex={selectedSolutionIndex}
        onBack={() => {
          setSelectedActionable(null);
          setSelectedSolutionIndex(null);
        }}
        activeTab={activeTab}
      />
    );
  }

  const handleActionableClick = (actionable, section, solutionIndex) => {
    setSelectedActionable(actionable);
    setSelectedSolutionIndex(solutionIndex);
  };

  return (
    <div className="gap-detail-container">
      <div ref={navRef} className="nav-back-gap-detail">
        <button className="back-button-gap" onClick={onBack}>
          <img src={back} alt='back' />
          <div className='back-gap-title'>   {item.title}</div>
        </button>


        <div style={{ backgroundColor: 'white', paddingBottom: '8px' }}>
          <div className='header_content'>
            <div className="item-description-bg">
            Personas Effected 
          <>
            <span className="separator">|</span>
            <span className="personas"> {personasText}</span>
          </>
      
            </div>
            <div className="category-badge-gap">
              {item.category}
            </div>
          </div>

        </div>

        <div style={{ background: "white" }}>

          <div className="tab-switcher-container">
            <div className="tab-switcher">
              {uniqueTags.map((tag, index) => (
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

      <div className="detail-content"    style={{ marginTop: `${navHeight + 50}px` }}>
        {activeSections.map((section, solutionIndex) => (
          <>
            <div key={solutionIndex} className="detail-section-solution">
              <div className="detail-header">
                <span className="detail-tag">Solution {solutionIndex + 1} / {activeSections.length}</span>
                <button onClick={() => toggleAccordion(solutionIndex)} className="accordion-toggle">
                  <svg
                    className={`chevron ${isExpandedArray[solutionIndex] ? 'chevron-down' : 'chevron-up'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

              </div>
              {isExpandedArray[solutionIndex] && (
                <div className="detail-body">
                  <p>{section.content}</p>
                </div>
              )}
            </div>

            {isExpandedArray[solutionIndex] && (
              <>
                <div className="detail-section-actionable">
                  <div className="detail-header">
                    <span className="detail-tag">PROGRESS</span>
                  </div>
                  <div className="detail-body">
                    {section.actionable.map((item, index) => (
                      <div key={index} className="actionable-item" onClick={() => handleActionableClick(item, section,solutionIndex)} style={{
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


                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-tag">Impact</span>
                  </div>
                  <div className="detail-body">
                  <div dangerouslySetInnerHTML={{ __html: section.impact || '' }} />

                  </div>
                </div>


                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-tag">Reference links</span>
                  </div>
                  <div className="detail-body">
                  <div dangerouslySetInnerHTML={{ __html: section.reference || '' }} />
                  </div>
                </div>
              </>
            )}
          </>
        ))}
      </div>


    </div>
  );
};
export default DetailView;  