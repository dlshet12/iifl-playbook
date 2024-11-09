import './actionableView.css';
const ActionableView = ({ items = [], selectedFilters = { dbt: [], actionable: [] },handleStatusClick }) => {

  const filteredItems = items.map(item => ({
    ...item,
    statuses: (item.statuses || []).filter(status => {
      const dbtMatch = selectedFilters.dbt.length === 0 || 
                      selectedFilters.dbt.includes(status.category);
      const daysMatch = selectedFilters.actionable.length === 0 || 
                        selectedFilters.actionable.some(days => status.days === parseInt(days));
      return dbtMatch && daysMatch;
    })
  })).filter(item => item.statuses.length > 0);

  return (
    <div className="actionable-container">
      {filteredItems.map((item, index) => (
        <div key={index} className="gap-item">
          <div className="gap-title">{item.title}</div>
          <div className="status-tags">
            {(() => {
              const categoryCount = {};

              item.statuses.forEach(status => {
                categoryCount[status.category] = (categoryCount[status.category] || 0) + 1;
              });

              return item.statuses.map((status, statusIndex) => {
             
                let solutionLabel;
                if (categoryCount[status.category] > 1) {
                  const occurrenceIndex = item.statuses
                    .slice(0, statusIndex + 1)
                    .filter(s => s.category === status.category).length;
                  solutionLabel = `${status.category} - Solution ${String(occurrenceIndex).padStart(2, '0')}`;
                } else {
                  solutionLabel = `${status.category}`;
                }

                return (
                  <div key={statusIndex} className={`status-tag ${status.className}`} onClick={() => handleStatusClick(status, item)}>
                    {solutionLabel} - {status.days} Days - {status.status}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionableView;