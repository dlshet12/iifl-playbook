import React, { useState, useEffect } from 'react';

import './progressDetail.css';
import back from '../asset/back_icon.svg';
const ProgressDetail = ({ onBack, selectedStatus }) => {

  const { sections, solutionContent } = selectedStatus || {};

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
                  <p>{solutionContent} </p>
                </div>
              </div>

              {section.actionable.map((action, actionIndex) => (
                <React.Fragment key={actionIndex}>
                  <div className="detail-section-actionable-detail">
                    <div className="detail-header-actionable">
                      <span className="detail-tag">ACTIONABLE</span>
                      <div className="status">
                        Status: <span style={{ fontWeight: '500' }}>{action.status}</span>
                      </div>
                    </div>

                    <div className="detail-body-action">

                      <div
                        className="actionable-steps-list"

                      />
                      <div dangerouslySetInnerHTML={{ __html: action.details.actionableSteps || '' }} />
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
                      <div dangerouslySetInnerHTML={{ __html: action.details.kpis || '' }} />
                    </div>
                  </div>

                </React.Fragment>
              ))}
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