import './gapDetail.css';
import { Box,Chip } from '@mui/material';
const DetailView = ({ section, onBack, item }) => {
  
  const [prefix, personasText] = item.description.split('|');

  const actionables = [
    { days: 45, color: 'green' },
    { days: 90, color: 'red' },
    { days: 180, color: 'blue' }
  ];

    return (
      <div className="gap-container">
        <div className="nav-back">
          <button className="back-button" onClick={onBack}>
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {item.title}
          </button>
          <div className="item-description-bg">
        {prefix}
        {personasText && (
          <>
            <span className="separator">|</span>
            <span className="personas">{personasText.trim()}</span>
          </>
        )}
      </div>
      <div className="category-badge-gap">
          {item.category}
        </div>
        <Box className="tags-container-tab">
        {item.tags.map((tag, index) => (
          <Chip key={index} label={tag} className='chip_tag' sx={{backgroundColor:'#BCE3FF', fontSize:'12px',fontWeight:'500', color:'#656565', padding:'4px 7px'}} />
        ))}
      </Box>

        </div>
  
        <div className="detail-content">
          <div className="detail-section-solution">
            <div className="detail-header">
              <span className="detail-tag">Solution</span>
            </div>
            <div className="detail-body">
              <p>{section.content}</p>
            </div>
          </div>
  
          <div className="detail-section-actionable">
      <div className="detail-header">
        <span className="detail-tag">ACTIONABLE'S</span>
      </div>
      <div className="detail-body">
        {actionables.map((item, index) => (
          <div key={index} className="actionable-item">
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
              <span>Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and service</span>
             
            </div>
          </div>


          <div className="detail-section">
            <div className="detail-header">
              <span className="detail-tag">Reference links</span>
            </div>
            <div className="detail-body">
              <span>Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and service</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default DetailView;  