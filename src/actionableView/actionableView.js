import './actionableView.css';
const ActionableView = () => {
    const gapItems = [
        {
          title: "Lack of relevant and easily consumable information.",
          statuses: [
            { category: "CX", days: 90, status: "Completed", className: "status-completed" },
            { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
            { category: "Creative", days: 45, status: "Not started", className: "status-not-started" },
            { category: "UX", days: 90, status: "In progress", className: "status-in-progress" }
          ]
        },
        {
          title: "Insufficient TOMA",
          statuses: [
            { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
            { category: "Creative", days: 90, status: "Not started", className: "status-not-started" }
          ]
        },
        {
          title: "Enhanced competitor presence across digital touchpoints",
          statuses: [
            { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
            { category: "SEO", days: 90, status: "Completed", className: "status-completed" }
          ]
        }
      ];
  
    return (
        <div className="actionable-container">
        {gapItems.map((item, index) => (
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