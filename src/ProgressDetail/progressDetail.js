import { useState, useEffect } from 'react';

import './progressDetail.css';
import back from '../asset/back_icon.svg';
const ProgressDetail = ({item, onBack, selectedStatus }) => {

    if (!item || !selectedStatus) return null;

  // Find the section content and actionable steps matching the clicked status
  const section = item.sections.find(
    sec => sec.type === selectedStatus.status.category
  );

  const actionable = section?.actionable.find(
    act => act.days === selectedStatus.status.days && act.status === selectedStatus.status.status
  );

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
          <img src={back} alt="back" />
          <div className="back-gap-title"> Progress</div>
        </button>

        <div className="tab-bg">
          <div className="tab-container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="tab-action-switcher">
      
                <button
             
                >
              days
                </button>
           
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
              <p>{section?.content} </p>
            </div>
          </div>

          <div className="detail-section-actionable-detail">
            <div className="detail-header-actionable">
              <span className="detail-tag">ACTIONABLE</span>
              <div className="status">
                Status: <span style={{ fontWeight: '500' }}></span>
              </div>
            </div>

            <div className="detail-body-action">
          
              <div
                className="actionable-steps-list"
   
              />
                   <div dangerouslySetInnerHTML={{ __html: actionable?.details?.actionableSteps }} />
            </div>
          </div>

          <div className="detail-section-actionable-detail">
            <div className="detail-header">
              <span className="detail-tag">KPI</span>
            </div>
            <div className="detail-body-action">
         
                <div
                className="actionable-steps-list"
           
              />
                <div dangerouslySetInnerHTML={{ __html: actionable?.details?.kpis }} />
            </div>
          </div>
        </div>
        
    </div>
  );
};

export default ProgressDetail;