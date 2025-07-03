/**
 * @file Defines the core TypeScript types for the ThesisBuilder application.
 * These types are simplified for the MVP and focus on the data required
 * for the research library and the static thesis report.
 */

/**
 * Represents the status of a research report.
 * - 'pending': The analysis is currently in progress.
 * - 'complete': The analysis has finished successfully.
 */
export type ReportStatus = 'pending' | 'complete';

/**
 * Represents a single conviction score in the executive summary.
 */
export interface ConvictionScore {
  title: string;
  score: number;
}

/**
 * Represents a single step within a phase of the analysis.
 * This is a static component in the MVP.
 */
export interface AnalysisStep {
  title: string;
  summary: string;
  insights: string[];
}

/**
 * Represents one of the four major phases of the investment thesis.
 */
export interface AnalysisPhase {
  title: string;
  steps: AnalysisStep[];
}

/**
 * Represents a comprehensive research report. This is the central data model
 * for the application and is stored in `localStorage`.
 */
export interface ResearchReport {
  id: string;
  ticker: string;
  companyName: string;
  status: ReportStatus;
  createdAt: string; // ISO date-time string for chronological sorting
  completedAt?: string; // ISO date-time string, available when complete

  // The overall conviction score, displayed on the report card when complete.
  overallConvictionScore?: number;

  // Detailed analysis, available only when the status is 'complete'.
  executiveSummary?: {
    summary: string;
    convictionScores: ConvictionScore[];
  };
  analysis?: {
    phases: AnalysisPhase[];
  };
} 