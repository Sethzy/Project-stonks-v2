'use client';

/**
 * @file This file defines the `useThesisGeneration` custom hook.
 * This hook orchestrates the asynchronous thesis generation process. It is responsible
 * for creating an initial "pending" report, triggering the mock analysis engine,
 * and then using a callback to update the report's state upon completion, all orchestrated through functions passed in as props.
 */

import { useCallback } from 'react';
import { toast } from 'sonner';
import { type ResearchReport } from '@/types/thesis';
import { generateMockAnalysis } from '@/lib/mock-analysis-engine';

/**
 * Defines the props for the `useThesisGeneration` hook.
 * It requires functions to add and update reports in the research library.
 * This dependency injection makes the hook more modular and testable.
 */
interface UseThesisGenerationProps {
  addReport: (report: ResearchReport) => void;
  updateReport: (report: ResearchReport) => void;
}

/**
 * A custom hook to manage the thesis generation workflow.
 *
 * @param {UseThesisGenerationProps} props - The functions for report management.
 * @returns An object containing the `startAnalysis` function.
 */
export function useThesisGeneration({
  addReport,
  updateReport,
}: UseThesisGenerationProps) {
  /**
   * Initiates the analysis for a given stock ticker.
   * It creates a pending report, adds it to the library for immediate UI feedback,
   * and then starts the background analysis process.
   *
   * @param ticker - The stock ticker to analyze (e.g., "AAPL").
   */
  const startAnalysis = useCallback(
    (ticker: string) => {
      if (!ticker.trim()) {
        console.error('[useThesisGeneration] Ticker cannot be empty.');
        return;
      }

      // 1. Create a new "pending" report object to provide instant user feedback.
      const pendingReport: ResearchReport = {
        id: crypto.randomUUID(), // Generate a unique ID for the report.
        ticker: ticker.toUpperCase(),
        // For the MVP, we derive a mock company name from the ticker.
        companyName: `${ticker.toUpperCase()} Analysis`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // 2. Add the pending report to the central state via the `addReport` function.
      addReport(pendingReport);

      // Add a toast notification to inform the user that the analysis has started.
      toast.info(`Analysis started for ${pendingReport.ticker}.`, {
        description: 'You will be notified when it is complete.',
      });

      // 3. Invoke the mock analysis engine.
      // The engine will simulate a delay and then call the `onComplete` callback.
      generateMockAnalysis(pendingReport, (completedReport) => {
        // 4. Once the analysis is complete, update the report in the central state.
        updateReport(completedReport);
        toast.success(`Analysis complete for ${completedReport.ticker}.`, {
          description: 'The report is now available to view.',
        });
      });
    },
    [addReport, updateReport],
  ); // Dependencies ensure the function is stable if props don't change.

  return { startAnalysis };
} 