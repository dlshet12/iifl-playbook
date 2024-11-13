
import './actionableView.css';
const ActionableView = ({ items = [], selectedFilters = { dbt: [], actionable: [] }, handleStatusClick }) => {

  
  const filteredItems = items.map(item => ({
    ...item,
    sections: (item.sections || []).map(section => ({
      ...section,
      actionable: (section.actionable || []).filter(action => {
        const dbtMatch = selectedFilters.dbt.length === 0 || 
                        selectedFilters.dbt.includes(section.type);
        const daysMatch = selectedFilters.actionable.length === 0 || 
                         selectedFilters.actionable.some(days => action.days === days);

        // Additional filtering logic based on the completion status and days threshold
        if (action.status === "Completed") {
          if (action.days === "45") {
            return false; // skip 45 days - completed
          } else if (action.days === "90") {
            return false; // skip 90 days - completed
          } else if (action.days === "180") {
            return true; // show 180 days - completed
          }
        }

        // Return "Not Started" for 90 or 180 days if previous thresholds were complete
        if (action.status === "Not Started" && action.days === "90") {
          const prevAction = section.actionable.find(a => a.days === "45" && a.status === "Completed");
          return prevAction ? true : false;
        } else if (action.status === "Not Started" && action.days === "180") {
          const prevAction = section.actionable.find(a => a.days === "90" && a.status === "Completed");
          return prevAction ? true : false;
        }

        return dbtMatch && daysMatch;
      }).slice(0, 1) // Take only the first actionable object after applying the filters
    })).filter(section => section.actionable.length > 0)
  })).filter(item => item.sections.some(section => section.actionable.length > 0));

  console.log("Filtered items:", filteredItems);

  return (
    <div className="actionable-container">
      {filteredItems.map((item, index) => (
      
        <div key={index} className="gap-item">
          <div className="gap-title">{item.title}</div>
          <div className="status-tags">
          {(() => {
              const categoryCount = {};
              
              item.sections.forEach(section => {
                categoryCount[section.type] = (categoryCount[section.type] || 0) + 1;
              });

              return item.sections.map((section, statusIndex) => {
                let solutionLabel;
                
                // Only add numbering if the type appears more than once
                if (categoryCount[section.type] > 1) {
                  const occurrenceIndex = item.sections
                    .slice(0, statusIndex + 1)
                    .filter(s => s.type === section.type).length;
                  solutionLabel = `${section.type} - Solution ${String(occurrenceIndex).padStart(2, '0')}`;
                } else {
                  solutionLabel = section.type;
                }

                const action = section.actionable[0];
                return action ? (
                  <div 
                    key={statusIndex} 
                    className={`status-tag ${action.color}`} 
                    onClick={() => handleStatusClick(section, item, solutionLabel)}
                  >
                    {solutionLabel} - {action.days} Days - {action.status}
                  </div>
                ) : null;
              });
            })()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionableView;