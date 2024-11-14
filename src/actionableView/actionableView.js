
import './actionableView.css';
const ActionableView = ({ items = [], selectedFilters = { dbt: [], actionable: [] }, handleStatusClick }) => {
 
  const filteredItems = items.map(item => ({
    ...item,
    sections: (item.sections || []).map(section => {
      // Apply general filtering and then take only the first actionable item
      const filteredActionables = (section.actionable || []).filter(action => {
        const dbtMatch = selectedFilters.dbt.length === 0 || selectedFilters.dbt.includes(section.type);
        const daysMatch = selectedFilters.actionable.length === 0 || selectedFilters.actionable.some(days => parseInt(days) === Number(action.days));
   
        // Apply general filtering to each action
        return dbtMatch && daysMatch;
      });
   
      // Now, we handle the logic to show the third item if the first two are "Completed"
      const actionableArray = filteredActionables;
   
      if (actionableArray.length > 0) {
        // If the first item is completed, check the second item
        if (actionableArray[0].status === "Completed" && actionableArray.length > 1) {
          // If the second item is completed, show the third item if it exists
          if (actionableArray[1].status === "Completed" && actionableArray.length > 2) {
            // Show the third item regardless of its status
            return {
              ...section,
              actionable: [actionableArray[2]] // Show third item, no status check
            };
          }
          // If the second is not completed, show the second item (if exists)
          return {
            ...section,
            actionable: [actionableArray[1]]
          };
        }
   
        // If the first item is not "Completed", show the first non-"Completed" item as we did earlier
        for (let i = 0; i < actionableArray.length; i++) {
          if (actionableArray[i].status !== "Completed") {
            return {
              ...section,
              actionable: [actionableArray[i]] // Show the first non-"Completed" item
            };
          }
        }
      }
   
      // If no non-"Completed" item is found, fall back to showing the first item
      return {
        ...section,
        actionable: actionableArray.slice(0, 1) // Default behavior: show first actionable item
      };
    }).filter(section => section.actionable.length > 0)
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
                    onClick={() => handleStatusClick(section, items, solutionLabel)}
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