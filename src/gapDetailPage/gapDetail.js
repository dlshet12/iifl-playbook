import './gapDetail.css';
const DetailView = ({ section, onBack }) => {
    return (
      <div className="gap-container">
        <div className="nav-back">
          <button className="back-button" onClick={onBack}>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
  
        <div className="detail-content">
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">Solution</span>
            </div>
            <div className="detail-body">
              <p>{section.content}</p>
            </div>
          </div>
  
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">Actionables</span>
            </div>
            <div className="detail-body">
              <div className="actionable-item">
                <span className="bullet">•</span>
                <span>Define content strategy and guidelines</span>
              </div>
              <div className="actionable-item">
                <span className="bullet">•</span>
                <span>Create personalized user journeys</span>
              </div>
              <div className="actionable-item">
                <span className="bullet">•</span>
                <span>Develop multimedia content library</span>
              </div>
            </div>
          </div>
  
          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">KPI's</span>
            </div>
            <div className="detail-body">
              <div className="kpi-item">
                <span className="bullet">•</span>
                <span>Content engagement rate</span>
              </div>
              <div className="kpi-item">
                <span className="bullet">•</span>
                <span>User satisfaction score</span>
              </div>
              <div className="kpi-item">
                <span className="bullet">•</span>
                <span>Knowledge base usage metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default DetailView;  