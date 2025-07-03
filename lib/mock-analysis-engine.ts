/**
 * @file Provides a mock analysis engine for ThesisBuilder MVP.
 * This engine simulates an asynchronous, time-intensive research process
 * and returns a complete, structured report object.
 */

import {
  type ResearchReport,
  type AnalysisPhase,
  type ConvictionScore,
} from '@/types/thesis';

// --- MOCK DATA GENERATION ---

/**
 * Generates a list of mock conviction scores.
 * @returns An array of ConvictionScore objects.
 */
function createMockConvictionScores(): ConvictionScore[] {
  return [
    { title: 'Valuation', score: 8.1 },
    { title: 'Market Position', score: 7.5 },
    { title: 'Financial Health', score: 8.8 },
    { title: 'Growth Strategy', score: 7.2 },
    { title: 'Moat/Competitive Advantage', score: 8.5 },
    { title: 'Management Quality', score: 7.9 },
  ];
}

/**
 * Generates the mock 4-phase analysis data.
 * @returns An array of AnalysisPhase objects.
 */
function createMockAnalysisPhases(): AnalysisPhase[] {
  return [
    {
      title: 'Phase 1: Foundational Analysis',
      steps: [
        {
          title: 'Market & Industry Analysis',
          summary:
            'Assesses the broader market dynamics, industry trends, and competitive landscape. The goal is to understand the external environment in which the company operates.',
          insights: [
            'Total Addressable Market (TAM) is growing at 8% CAGR.',
            'Key competitors are losing market share due to outdated technology.',
            'Regulatory tailwinds are expected to benefit the entire sector.',
          ],
        },
        {
          title: 'Business Model Deep Dive',
          summary:
            "Examines how the company creates, delivers, and captures value. This includes analyzing its revenue streams, cost structure, and core value proposition.",
          insights: [
            'High-margin SaaS model with 95% recurring revenue.',
            'Customer acquisition cost (CAC) payback period is an impressive 12 months.',
            'Strong network effects create a significant barrier to entry.',
          ],
        },
      ],
    },
    {
      title: 'Phase 2: Financial & Valuation Assessment',
      steps: [
        {
          title: 'Financial Health & Performance',
          summary:
            "A thorough review of the company's financial statements, including income, balance sheet, and cash flow. Focuses on stability, profitability, and efficiency.",
          insights: [
            'Consistent double-digit revenue growth over the past 5 years.',
            'Zero long-term debt provides significant financial flexibility.',
            'Operating margins have expanded by 300 basis points year-over-year.',
          ],
        },
        {
          title: 'Valuation Analysis',
          summary:
            'Determines the intrinsic value of the company using various models like DCF, comparable company analysis, and precedent transactions.',
          insights: [
            'DCF analysis suggests a 25% upside from the current stock price.',
            'Trading at a discount to peers on a P/E and EV/EBITDA basis.',
            'The market is currently underappreciating the long-term growth potential.',
          ],
        },
      ],
    },
    {
      title: 'Phase 3: Competitive & Strategic Positioning',
      steps: [
        {
          title: 'Moat & Competitive Advantage',
          summary:
            "Identifies the company's sustainable competitive advantages (the \"moat\") that protect it from rivals and allow it to earn high returns on capital.",
          insights: [
            'Patented technology and strong brand recognition form a wide moat.',
            'High switching costs for customers lead to excellent retention rates.',
            'Economies of scale provide a significant cost advantage.',
          ],
        },
        {
          title: 'Growth Strategy & Catalysts',
          summary:
            "Evaluates the company's strategy for future growth, including new products, market expansion, and potential M&A activities.",
          insights: [
            'International expansion represents a massive untapped opportunity.',
            'A new product launch in Q4 is expected to be a major growth catalyst.',
            'Strategic partnerships are opening up new distribution channels.',
          ],
        },
      ],
    },
    {
      title: 'Phase 4: Risk & Management Assessment',
      steps: [
        {
          title: 'Risk Factors',
          summary:
            'Identifies and analyzes potential risks that could negatively impact the company, including operational, financial, and market-related risks.',
          insights: [
            'High dependency on a single supplier is a key operational risk.',
            'Potential for increased regulation in the industry.',
            'Execution risk associated with the aggressive expansion plan.',
          ],
        },
        {
          title: 'Management & Governance',
          summary:
            "Assesses the quality, experience, and alignment of the management team, as well as the company's corporate governance practices.",
          insights: [
            'The CEO has a strong track record of successful capital allocation.',
            'High insider ownership aligns management interests with shareholders.',
            'The board is composed of experienced and independent directors.',
          ],
        },
      ],
    },
  ];
}

/**
 * The main analysis generation function. It takes a pending report, simulates
 * a delay, and then returns a fully populated, 'complete' report.
 *
 * @param pendingReport The initial report object with 'pending' status.
 * @param onComplete A callback function that receives the completed report.
 */
export function generateMockAnalysis(
  pendingReport: ResearchReport,
  onComplete: (report: ResearchReport) => void,
): void {
  const processingTime = 5000 + Math.random() * 5000; // Simulate 5-10 seconds
  console.log(
    `[MockEngine] Starting analysis for ${pendingReport.ticker}. Will take ${
      processingTime / 1000
    }s.`,
  );

  setTimeout(() => {
    const convictionScores = createMockConvictionScores();
    const overallConvictionScore =
      convictionScores.reduce((acc, curr) => acc + curr.score, 0) /
      convictionScores.length;

    const completedReport: ResearchReport = {
      ...pendingReport,
      status: 'complete',
      completedAt: new Date().toISOString(),
      overallConvictionScore: parseFloat(overallConvictionScore.toFixed(1)),
      executiveSummary: {
        summary: `Based on a comprehensive 4-phase analysis, ${pendingReport.companyName} presents a compelling investment opportunity. The company benefits from a strong competitive moat, excellent financial health, and multiple growth catalysts. While risks related to supplier dependency exist, the experienced management team and discounted valuation provide a significant margin of safety.`,
        convictionScores,
      },
      analysis: {
        phases: createMockAnalysisPhases(),
      },
    };

    console.log(
      `[MockEngine] Analysis for ${pendingReport.ticker} complete.`,
    );
    onComplete(completedReport);
  }, processingTime);
} 