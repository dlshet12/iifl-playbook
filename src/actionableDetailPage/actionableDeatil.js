import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './actionableDetail.css';
import back from '../asset/back_icon.svg';
const ActionDetailView = ({ section, onBack, item, actionable, activeTab }) => {

  const [activeDay, setActiveDay] = useState(actionable.days);
  const [activeActionable, setActiveActionable] = useState(section.actionable[0]);
  const [direction, setDirection] = useState(0);
  // Update active actionable when tab changes
  useEffect(() => {
    const selected = section.actionable.find(action => action.days === activeDay);
    if (selected) {
      setActiveActionable(selected);
    }
  }, [activeDay, section.actionable]);

  const activeSection = item.sections.find(s => s.type === activeDay) || section;

  const handleTabChange = (newTab) => {
    const currentIndex = item.tags.indexOf(activeDay);
    const newIndex = item.tags.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveDay(newTab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
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
          <div className='back-gap-title'>{`${activeTab} Progress`}</div>
        </button>


        <div className='tab-bg'>
          <div className="tab-container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="tab-action-switcher">
              {section.actionable.map((actionableItem, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(actionableItem.days)}
                  className={`tab-button ${activeDay === actionableItem.days ? 'active' : ''}`}
                >
                  {actionableItem.days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="actionable-content">
        <div className="detail-section-solution-actionable">
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