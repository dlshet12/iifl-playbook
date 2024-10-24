import { useState } from 'react';
import './actionableDetail.css';
const ActionDetailView = ({ section, onBack, item, actionable }) => {
  
    const [activeTab, setActiveTab] = useState(actionable.days);
 
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
                onClick={() => setActiveTab(actionableItem.days)}
                className={`tab-button ${activeTab === actionableItem.days ? 'active' : ''}`}
              >
               {actionableItem.days}
              </button>
            ))}
          </div>
        </div>

        </div>
  
        <div className="actionable-content">
          <div className="detail-section-solution">
            <div className="detail-header">
              <span className="detail-tag">Cx Solution</span>
            </div>
            <div className="detail-body">
              <p>{actionable.details.cxSolution}</p>
            </div>
          </div>
  
          <div className="detail-section-actionable">
      <div className="detail-header">
        <span className="detail-tag">ACTIONABLE</span>
      </div>
      <div className="detail-body">
      <ul className="actionable-steps-list">
              {actionable.details.actionableSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
      </div>
    </div>
  
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">KPI</span>
            </div>
            <div className="detail-body">
            <ul className="kpi-list">
              {actionable.details.kpis.map((kpi, index) => (
                <li key={index}>{kpi}</li>
              ))}
            </ul>
             
            </div>
          </div>


        </div>
      </div>
    );
  };
export default ActionDetailView;  