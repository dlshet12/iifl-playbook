import { useState , useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './actionableDetail.css';
const ActionDetailView = ({ section, onBack, item, actionable }) => {
  
    const [activeTab, setActiveTab] = useState(actionable.days);
    const [activeActionable, setActiveActionable] = useState(section.actionable[0]);
    const [direction, setDirection] = useState(0);
      // Update active actionable when tab changes
  useEffect(() => {
    const selected = section.actionable.find(action => action.days === activeTab);
    if (selected) {
      setActiveActionable(selected);
    }
  }, [activeTab, section.actionable]);

  const activeSection = item.sections.find(s => s.type === activeTab) || section;

  const handleTabChange = (newTab) => {
    const currentIndex = item.tags.indexOf(activeTab);
    const newIndex = item.tags.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };
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
      <div className="gap-container">
        <div className="nav-back-gap-detail">
          <button className="back-button-gap" onClick={onBack}>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className='back-gap-title'>
           Actionable
            </div>
          </button>

          

        <div className="tab-container">
          <div className="tab-action-switcher">
            {section.actionable.map((actionableItem, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(actionableItem.days)}
                className={`tab-button ${activeTab === actionableItem.days ? 'active' : ''}`}
              >
               {actionableItem.days}
              </button>
            ))}
          </div>
        </div>

        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
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
          >

  
        <div className="actionable-content">
          <div className="detail-section-solution">
            <div className="detail-header">
              <span className="detail-tag">Cx Solution</span>
            </div>
            <div className="detail-body">
              <p>{activeActionable.details.cxSolution}</p>
            </div>
          </div>
  
          <div className="detail-section-actionable">
      <div className="detail-header">
        <span className="detail-tag">ACTIONABLE</span>
      </div>
      <div className="detail-body-action">
      <ul className="actionable-steps-list">
              {activeActionable.details.actionableSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
      </div>
    </div>
  
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">KPI</span>
            </div>
            <div className="detail-section-actionable">
            <ul className="kpi-list">
              {activeActionable.details.kpis.map((kpi, index) => (
                <li key={index}>{kpi}</li>
              ))}
            </ul>
             
            </div>
          </div>


        </div>

        
    </motion.div>
        </AnimatePresence>
      </div>
    );
  };
export default ActionDetailView;  