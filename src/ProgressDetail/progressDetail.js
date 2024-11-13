import React ,{useState, useEffect } from 'react';

import './progressDetail.css';
import back from '../asset/back_icon.svg';
const ProgressDetail = ({ onBack, selectedStatus }) => {
  const { sections, solutionContent, selectedDay, solutionNumber, actionableArray } = selectedStatus || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#BCFFBC';
      case 'Delay':
      case 'Not Started':
        return '#FEADAF';
      case 'In progress':
        return '#BCE3FF';
      default:
        return 'grey';
    }
  };

  // Define the days you want to display
  const daysOptions = [45, 90, 180];
  const [activeDay, setActiveDay] = useState(selectedDay || 45);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentActionable, setCurrentActionable] = useState(null);

  // Update content based on selected day
  useEffect(() => {
    if (actionableArray) {
      updateContentForDay(activeDay);
    }
  }, [activeDay, actionableArray]);

  const updateContentForDay = (day) => {
    const actionableForDay = actionableArray.find(action => parseInt(action.days) === day);
    if (actionableForDay) {
      setCurrentActionable(actionableForDay);
      setCurrentStatus(actionableForDay.status);
    } else {
      setCurrentActionable(null);
      setCurrentStatus(null);
    }
  };

  const handleTabChange = (day) => {
    setActiveDay(day);
  };

  return (
    <>
      {sections && sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="action-detail-container">
            <div className="nav-back-actionable">
              <button className="back-button-gap-detail" onClick={onBack}>
                <img src={back} alt="back" />
                <div className="back-gap-title">{section.type} Progress</div>
              </button>

              <div className="tab-bg">
                <div className="tab-container">
                  <div className="tab-action-switcher" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {daysOptions.map((day, index) => {
                      const hasData = actionableArray.some(action => parseInt(action.days) === day);
                      return (
                        <button
                          key={index}
                          onClick={() => handleTabChange(day)}
                          className={`tab-button ${activeDay === day ? 'active' : ''}`}
                          disabled={!hasData}
                          style={{ opacity: hasData ? 1 : 0.5 }}
                        >
                          {day} days
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="actionable-content">
              <div className="detail-section-solution-actionable">
                <div className="detail-header">
                  <span className="detail-tag">Solution</span>
                </div>
                <div className="detail-body-actionable">
                  <p>{solutionContent}</p>
                </div>
              </div>

              {currentActionable ? (
                <>
                  <div className="detail-section-actionable-detail">
                    <div className="detail-header-actionable">
                      <span className="detail-tag">ACTIONABLE</span>
                      <div className="status" style={{ backgroundColor: getStatusColor(currentStatus) }}>
                        Status: <span style={{ fontWeight: '500' }}>{currentStatus}</span>
                      </div>
                    </div>

                    <div className="detail-body-action">
                      <div dangerouslySetInnerHTML={{ __html: currentActionable.details.actionableSteps || '' }} />
                    </div>
                  </div>

                  <div className="detail-section-actionable-detail">
                    <div className="detail-header">
                      <span className="detail-tag">KPI</span>
                    </div>
                    <div className="detail-body-action">
                      <div dangerouslySetInnerHTML={{ __html: currentActionable.details.kpis || '' }} />
                    </div>
                  </div>
                </>
              ) : (
                <p>No data available for {activeDay} days</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No relevant data found.</p>
      )}
    </>
  );
};

export default ProgressDetail;
