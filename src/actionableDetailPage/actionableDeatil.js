import { useState, useEffect } from 'react';
import './actionableDetail.css';
import back from '../asset/back_icon.svg';
const ActionDetailView = ({ section = {}, onBack, item = {}, actionable, activeTab,solutionIndex }) => {

  const [activeDay, setActiveDay] = useState(actionable?.days || '');
  const [activeActionable, setActiveActionable] = useState(actionable);
  const [direction, setDirection] = useState(0);

 // Modified: Find all sections that match the active tab
 const activeSections = item.sections.filter(s => s.type === activeTab);
 // Get the specific section based on solution index
 const activeSection = activeSections[solutionIndex];

  useEffect(() => {
    if (actionable) {
      setActiveActionable(actionable);
      setActiveDay(actionable.days);
    }
  }, [actionable]);

 // Ensure activeSection exists before accessing its properties
 const handleTabChange = (newDays) => {
  if (!activeSection) return;
  
  const newActionable = activeSection.actionable.find(a => a.days === newDays);
  if (newActionable) {
    setActiveDay(newDays);
    setActiveActionable(newActionable);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#BCFFBC';
      case 'Delay':
        return '#FEADAF';
        case 'Not Started':
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
          <img src={back} alt="back" />
          <div className="back-gap-title">{`${activeTab} Progress`}</div>
        </button>

        <div className="tab-bg">
          <div className="tab-container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="tab-action-switcher">
              {activeSection.actionable.map((actionableItem, index) => (
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

      {activeActionable?.details && (
        <div className="actionable-content">
          <div className="detail-section-solution-actionable">
            <div className="detail-header">
              <span className="detail-tag">Solution</span>
            </div>
            <div className="detail-body-actionable">
              <p>{activeSection?.content}</p>
            </div>
          </div>

          <div className="detail-section-actionable-detail">
            <div className="detail-header-actionable">
              <span className="detail-tag">ACTIONABLE</span>
              <div className="status" style={{ backgroundColor: getStatusColor(activeActionable.status) }}>
                Status: <span style={{ fontWeight: '500' }}>{activeActionable.status}</span>
              </div>
            </div>

            <div className="detail-body-action">
              {/* <ol className="actionable-steps-list">
                {activeActionable.details.actionableSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol> */}
              <div
                className="actionable-steps-list"
                dangerouslySetInnerHTML={{ __html: activeActionable.details.actionableSteps }}
              />
            </div>
          </div>

          <div className="detail-section-actionable-detail">
            <div className="detail-header">
              <span className="detail-tag">KPI</span>
            </div>
            <div className="detail-body-action">
              {/* <ol className="actionable-steps-list">
                {activeActionable.details.kpis.map((kpi, index) => (
                  <li key={index}>{kpi}</li>
                ))}
              </ol> */}
                <div
                className="actionable-steps-list"
                dangerouslySetInnerHTML={{ __html: activeActionable.details.kpis }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDetailView;