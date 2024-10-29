import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './actionableDetail.css';
import back from '../asset/back_icon.svg';
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete':
        return '#BCFFBC';
      case 'Delay':
        return '#FEADAF';
      case 'In progress':
        return '#BCE3FF';
      default:
        return 'grey';
    }
  };

  return (
    <div className="action-detail-container">
      <div className="nav-back-actionable">

        <button className="back-button-gap-detail" onClick={onBack}>
          <img src={back} alt='back' />
          <div className='back-gap-title'>Actionable</div>
        </button>


        <div className='tab-bg'>
          <div className="tab-container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="tab-action-switcher">
              {section.actionable.map((actionableItem, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(actionableItem.days)}
                  className={`tab-button ${activeTab === actionableItem.days ? 'active' : ''}`}
                >
                  {actionableItem.days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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


      <div className="actionable-content">
        <div className="detail-section-solution">
          <div className="detail-header">
            <span className="detail-tag">Cx Solution</span>
          </div>
          <div className="detail-body">
            <p>{activeActionable.details.cxSolution}</p>

            <div className='status' style={{ backgroundColor: getStatusColor(activeActionable.status)}}>Status: <span style={{fontWeight:'500'}}>{activeActionable.status}</span> </div>
          </div>
        </div>

        <div className="detail-section-actionable-detail">
          <div className="detail-header">
            <span className="detail-tag">ACTIONABLE</span>
          </div>
          <div className="detail-body-action">
            <ol className="actionable-steps-list">
              {activeActionable.details.actionableSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="detail-section-actionable-detail">
          <div className="detail-header">
            <span className="detail-tag">KPI</span>
          </div>
          <div className="detail-body-action">
            <ol className="actionable-steps-list">
              {activeActionable.details.kpis.map((kpi, index) => (
                <li key={index}>{kpi}</li>
              ))}
            </ol>

          </div>
        </div>


      </div>

      {/*         
    </motion.div>
        </AnimatePresence> */}
    </div>
  );
};
export default ActionDetailView;  