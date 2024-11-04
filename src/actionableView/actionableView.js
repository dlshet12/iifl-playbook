import './actionableView.css';
const ActionableView = ({ items,selectedFilters= { dbt: [], actionable: [] } }) => {


  // Filter items based on selected DBT categories and days
  const filteredItems = items.map(item => ({
    ...item,
    // Filter statuses based on selected DBT categories and days
    statuses: item.statuses.filter(status => {
      const dbtMatch = selectedFilters.dbt.length === 0 || 
                      selectedFilters.dbt.includes(status.category);
                      const daysMatch = selectedFilters.actionable.length === 0 || selectedFilters.actionable.some(days => status.days === parseInt(days));
      return dbtMatch && daysMatch;
    })
  })).filter(item => item.statuses.length > 0);
   
    return (
        <div className="actionable-container">
        {filteredItems.map((item, index) => (
          <div key={index} className="gap-item">
            <div className="gap-title">{item.title}</div>
            <div className="status-tags">
              {item.statuses.map((status, statusIndex) => (
                <div key={statusIndex} className={`status-tag ${status.className}`}>
                  {status.category} - {status.days} Days - {status.status}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default ActionableView;