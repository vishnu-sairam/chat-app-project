// backend/mockData.js
const { v4: uuidv4 } = require('uuid');

const mockResponses = [
  {
    id: uuidv4(),
    answerText: "Quarterly performance analysis shows revenue growth across all quarters. Q1 revenue ₹10L, Q2 ₹11L, Q3 ₹12L. Profit margins: Q1 ₹1L, Q2 ₹1.2L, Q3 ₹1.5L.",
    table: {
      columns: ["Company", "Q1 Revenue", "Q2 Revenue", "Q3 Revenue"],
      rows: [
        { Company: "Tech Solutions India", "Q1 Revenue": "₹10L", "Q2 Revenue": "₹11L", "Q3 Revenue": "₹12L" },
        { Company: "Digital Services Pvt Ltd", "Q1 Revenue": "₹8L", "Q2 Revenue": "₹9L", "Q3 Revenue": "₹10L" },
        { Company: "Innovation Hub", "Q1 Revenue": "₹12L", "Q2 Revenue": "₹13L", "Q3 Revenue": "₹14L" }
      ]
    },
    metadata: { type: "financial", source: "survey" }
  },
  {
    id: uuidv4(),
    answerText: "Employee satisfaction survey results across IT companies. Overall satisfaction score: 78%. Key factors: work-life balance, salary, growth opportunities.",
    table: {
      columns: ["Company", "Satisfaction %", "Employees", "Rating"],
      rows: [
        { Company: "Infosys Hyderabad", "Satisfaction %": "82%", Employees: "1,250", Rating: "4.1/5" },
        { Company: "TCS Vijayawada", "Satisfaction %": "79%", Employees: "980", Rating: "3.9/5" },
        { Company: "Wipro Visakhapatnam", "Satisfaction %": "75%", Employees: "650", Rating: "3.8/5" }
      ]
    },
    metadata: { type: "survey" }
  },
  {
    id: uuidv4(),
    answerText: "Market share analysis for software companies in Andhra Pradesh. Top 3 companies hold 65% of the market. Growth rate: 12% YoY.",
    table: {
      columns: ["Company", "Market Share %", "Revenue (₹Cr)", "Growth %"],
      rows: [
        { Company: "TechCorp India", "Market Share %": "28%", "Revenue (₹Cr)": "₹45", "Growth %": "15%" },
        { Company: "DataSoft Solutions", "Market Share %": "22%", "Revenue (₹Cr)": "₹38", "Growth %": "12%" },
        { Company: "CloudTech Systems", "Market Share %": "15%", "Revenue (₹Cr)": "₹28", "Growth %": "10%" }
      ]
    },
    metadata: { type: "market" }
  },
  {
    id: uuidv4(),
    answerText: "Customer retention survey results. Average retention rate: 85%. Top performing companies show 90%+ retention. Primary reasons: service quality and pricing.",
    table: {
      columns: ["Company", "Retention %", "Customers", "Satisfaction"],
      rows: [
        { Company: "ServicePro Ltd", "Retention %": "92%", Customers: "5,420", Satisfaction: "4.5/5" },
        { Company: "CustomerFirst Inc", "Retention %": "88%", Customers: "3,850", Satisfaction: "4.3/5" },
        { Company: "Quality Services", "Retention %": "85%", Customers: "2,960", Satisfaction: "4.1/5" }
      ]
    },
    metadata: { type: "retention" }
  },
  {
    id: uuidv4(),
    answerText: "Productivity metrics across development teams. Average productivity index: 7.8/10. Teams using agile methodology show 15% higher productivity.",
    table: {
      columns: ["Company", "Productivity Index", "Team Size", "Projects"],
      rows: [
        { Company: "DevTech Solutions", "Productivity Index": "8.5/10", "Team Size": "45", Projects: "12" },
        { Company: "CodeWorks India", "Productivity Index": "8.0/10", "Team Size": "38", Projects: "10" },
        { Company: "Agile Systems", "Productivity Index": "7.5/10", "Team Size": "32", Projects: "8" }
      ]
    },
    metadata: { type: "productivity" }
  },
  {
    id: uuidv4(),
    answerText: "Technology adoption survey in Andhra Pradesh companies. Cloud adoption: 68%, AI/ML: 42%, DevOps: 55%. Top adopters show 25% efficiency improvement.",
    table: {
      columns: ["Company", "Cloud %", "AI/ML %", "DevOps %"],
      rows: [
        { Company: "CloudFirst Technologies", "Cloud %": "95%", "AI/ML %": "78%", "DevOps %": "88%" },
        { Company: "AI Innovations Pvt Ltd", "Cloud %": "82%", "AI/ML %": "92%", "DevOps %": "75%" },
        { Company: "Modern Tech Solutions", "Cloud %": "75%", "AI/ML %": "65%", "DevOps %": "82%" }
      ]
    },
    metadata: { type: "technology" }
  }
];

const initialSessions = [
  {
    sessionId: uuidv4(),
    title: "Quarterly revenue analysis",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    messages: [
      { role: "user", text: "Show quarterly revenue analysis", timestamp: new Date().toISOString() },
      { role: "assistant", text: mockResponses[0].answerText, table: mockResponses[0].table, metadata: mockResponses[0].metadata, timestamp: new Date().toISOString(), answerId: mockResponses[0].id }
    ]
  },
  {
    sessionId: uuidv4(),
    title: "Employee satisfaction survey",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    messages: [
      { role: "user", text: "Employee satisfaction survey results", timestamp: new Date().toISOString() },
      { role: "assistant", text: mockResponses[1].answerText, table: mockResponses[1].table, metadata: mockResponses[1].metadata, timestamp: new Date().toISOString(), answerId: mockResponses[1].id }
    ]
  }
];

module.exports = { mockResponses, initialSessions };

