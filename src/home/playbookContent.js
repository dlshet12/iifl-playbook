import React, { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import './playbookContent.css';
import GapView from '../gapPage/gap';
import ListView from '../ListView/ListView';
import FilterChips from '../chips/chips';
import axios from 'axios';

// Main PlaybookContent Component
const PlaybookContent = ({ items, selectedFilters, activeView, setActiveView, view, setView  }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('gap');
  };

  const handleBack = () => {
    setView('list');
    setSelectedItem(null);
  };

   // Check if any filters are selected
   const areFiltersSelected = Object.values(selectedFilters).some(
    (filterValues) => filterValues.length > 0
  );

  // Function to apply the filters to the items list
  const applyFilters = () => {
    return items.filter(item => {
      // Check if the item matches the selected personas, stage, and DBT filters
      const personaMatch = selectedFilters.persona.length === 0 || selectedFilters.persona.some(persona => item.personas.includes(persona));
      const stageMatch = selectedFilters.stage.length === 0 || selectedFilters.stage.some(stage => stage.toLowerCase() === item.category.toLowerCase());
      const dbtMatch = selectedFilters.dbt.length === 0 || selectedFilters.dbt.some(tag => item.tags.includes(tag));

      const actionableMatch = selectedFilters.actionable.length === 0 || selectedFilters.actionable.some(actionableDays => 
        item.statuses.some(status => status.days === parseInt(actionableDays))
      );

      return personaMatch && stageMatch && dbtMatch && actionableMatch;
    });
  };

  // Filter the items before rendering
  const filteredItems = applyFilters();

  
  return (
    <Box className="playbook-content">

      {view === 'list' ? (
        <ListView items={filteredItems}
         onItemClick={handleItemClick} 
         hideTags={areFiltersSelected} 
         hideCategory={areFiltersSelected}
          activeView={activeView}
        setActiveView={setActiveView}
        selectedFilters={selectedFilters} />
      ) : (
        <GapView selectedItem={selectedItem} onBack={handleBack} />
      )}
    </Box>
  );
};


const PlaybookContents = () => {

  const itemData = [
    {
      category: "EXPLORATION",
      title: "Lack of relevant and easily consumable information.",
      description: "Personas Effected | New, Existing, Offline",
      personas: ["New", "Existing", "Offline"],
      tags: ["CX", "Media", "Creative", "UX"],
      impact: ["CX"],
      statuses: [
        { category: "CX", days: 160, status: "Completed", className: "status-completed" },
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "Creative", days: 45, status: "Not started", className: "status-not-started" },
        { category: "UX", days: 90, status: "In progress", className: "status-in-progress" }
      ],
      sections: [
        {
          type: "CX",
          content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'Complete',
              details: {
                cxSolution: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and service",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "Media",
          content: "Full Funnel media activation to amplify the content and communication.",
          actionable: [
            {
              days: 15,
              color: 'green',
              status:'Complete',
              details: {
                cxSolution: "Launch targeted social media campaign",
                actionableSteps: [
                  "Define audience segments",
                  "Create campaign content",
                  "Set up tracking pixels",
                  "Configure ad targeting"
                ],
                kpis: [
                  "25% increase in social engagement",
                  "30% increase in click-through rate",
                  "20% reduction in cost per acquisition"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "UX",
          content: "Create a knowledge base or resource centre with categorized articles and guides, and include an FAQ section addressing common user questions on both the website and different product landing pages.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'Complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
      ]
    },
    {
      category: "EXPLORATION",
      title: "Insufficient TOMA.",
      description: "Personas Effected | New, Existing",
      personas: ["New", "Existing"],
      tags: ["Media", "Creative"],
      impact: ["Media"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "Creative", days: 90, status: "Not started", className: "status-not-started" }
      ],
      sections: [
        {
          type: "Media",
          content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "Creative",
          content: "Full Funnel media activation to amplify the content and communication.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },

      ]
    },
    {
      category: "CONSIDERATION",
      title: "Enhanced competitor presence across digital touch-points.",
      description: "Personas Effected | Existing",
      personas: ["Existing"],
      tags: ["Media", "SEO",],
      impact: ["Media", "SEO"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "SEO", days: 160, status: "Completed", className: "status-completed" }
      ],
      sections: [
        {
          type: "Media",
          content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "SEO",
          content: "Full Funnel media activation to amplify the content and communication.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
 
      ]
    },
    {
      category: "CONSIDERATION",
      title: "Lack of integrated tools to help agents/call centre with cohesive insights for better customer understanding thus reducing manual process and TAT..",
      description: "Personas Effected |  New, Existing, Offline, Agent",
      personas: ["New", "Existing", "Offline", "Agent"],
      tags: ["CX", "Data"],
      impact: ["Data"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "SEO", days: 160, status: "Completed", className: "status-completed" }
      ],
      sections: [
        {
          type: "CX",
          content: "Provide personalized, mobile-friendly content, including short videos, infographics, and FAQs, tailored to users' browsing history, preferences, and transaction patterns to clearly explain financial products and services.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "Data",
          content: "Full Funnel media activation to amplify the content and communication.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
      ]
    },
    {
      category: "CONSIDERATION",
      title: "Lack of self-qualification tool available.",
      description: "Personas Effected |  Existing, Offline",
      personas: ["Existing", "Offline"],
      tags: ["UX", "Data",],
      impact: ["Data"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "SEO", days: 160, status: "Completed", className: "status-completed" }
      ],
      sections: [
        {
          type: "UX",
          content: "Optimize website and content for search engines to compete more effectively.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "Data",
          content: "Increase digital ad spend to capture more consideration-stage traffic.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
      ]
    },
    {
      category: "APPLICATION",
      title: "Non-Intuitive Online Forms Requiring Excessive Manual Entry.",
      description: "Personas Effected |  New, Existing, Offline, Agent",
      personas: ["New", "Existing", "Offline", "Agent"],
      tags: ["CX", "Innovation",],
      impact: ["CX"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "SEO", days: 160, status: "Completed", className: "status-completed" }
      ],
      sections: [
        {
          type: "CX",
          content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'complete',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
        {
          type: "Innovation",
          content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
      ]
    },
    {
      category: "VERIFICATION",
      title: "Insufficient real-time application updates and proactive communication",
      description: "Personas Effected |  New, Existing, Offline, Agent",
      personas: ["New", "Existing", "Offline", "Agent"],
      tags: ["Data", "UX", "Innovation",],
      impact: ["UX"],
      statuses: [
        { category: "Media", days: 45, status: "Delayed", className: "status-delayed" },
        { category: "SEO", days: 160, status: "Completed", className: "status-completed" }
      ],
      sections: [
        {
          type: "UX",
          content: "Develop a CRM tool for agents to provide a holistic customer view and insights.",
          actionable: [
            { 
              days: 45,
              color: 'green',
              status:'complete',
              details: {
                cxSolution: "Implement personalized content recommendation engine",
                actionableSteps: [
                  "Set up user behavior tracking",
                  "Create content categorization system",
                  "Develop recommendation algorithm",
                  "Design UI for personalized content display"
                ],
                kpis: [
                  "20% increase in content engagement",
                  "15% reduction in bounce rate",
                  "30% increase in time spent on site"
                ]
              }
            },
            { 
              days: 90,
              color: 'red',
              status:'Delay',
              details: {
                cxSolution: "Launch interactive educational content hub",
                actionableSteps: [
                  "Create video content library",
                  "Develop interactive tutorials",
                  "Implement user progress tracking",
                  "Design feedback collection system"
                ],
                kpis: [
                  "25% increase in product understanding",
                  "40% increase in self-service resolution",
                  "50% reduction in support tickets"
                ]
              }
            },
            { 
              days: 180,
              color: 'blue',
              status:'In progress',
              details: {
                cxSolution: "Roll out AI-powered content personalization",
                actionableSteps: [
                  "Train AI model on user data",
                  "Implement A/B testing framework",
                  "Deploy automated content tagging",
                  "Launch predictive content suggestions"
                ],
                kpis: [
                  "35% improvement in conversion rate",
                  "45% increase in customer satisfaction",
                  "60% increase in repeat visits"
                ]
              }
            }
          ]
        },
      ]
    },

  ];

  const [itemsData, setItemsData] = useState([]); 
  // State to track selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    persona: [],
    stage: [],
    dbt: [],
    actionable: [] 
  });
  const [activeView, setActiveView] = useState('gap');
  const [view, setView] = useState('list');

   // Fetch data from API
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://f1studioz.in/demo/iifl-playbook-wordpress/wp-json/gap/v1/list');
        setItemsData(response.data); // Update itemsData with API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
         {/* Conditionally render FilterChips based on view */}
      {view === 'list' && (
        <FilterChips selectedFilters={selectedFilters}
         setSelectedFilters={setSelectedFilters}  activeView={activeView} />
      )}
      
      {/* Pass selectedFilters to PlaybookContent */}
      <PlaybookContent items={itemsData} 
      selectedFilters={selectedFilters} 
      activeView={activeView}
       setActiveView={setActiveView}  view={view}
        setView={setView}/>
    </>
  )
}
export default PlaybookContents;