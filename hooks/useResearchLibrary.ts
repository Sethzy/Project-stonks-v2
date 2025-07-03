'use client';

/**
 * @file This file defines the `useResearchLibrary` custom hook.
 * This hook is responsible for managing the state of the research reports,
 * including adding, updating, and deleting them. It persists the report
 * library to the browser's `localStorage` to ensure data is saved
 * across sessions.
 */

import { useState, useEffect, useCallback } from 'react';
import { type ResearchReport } from '@/types/thesis';

// A unique key for storing the research library in localStorage.
const LOCAL_STORAGE_KEY = 'thesisbuilder.research_library';

/**
 * A custom hook to manage the lifecycle of the research report library.
 * It abstracts the logic for interacting with `localStorage` and provides
 * a simple API for manipulating the collection of reports.
 *
 * @returns An object containing:
 *  - `reports`: The current array of research reports.
 *  - `isLoaded`: A boolean indicating if the initial load from localStorage is complete.
 *  - `addReport`: A function to add a new report to the library.
 *  - `updateReport`: A function to update an existing report.
 *  - `deleteReport`: A function to remove a report from the library.
 */
export function useResearchLibrary() {
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to load the research library from localStorage on initial component mount.
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItems) {
        // Parse the stored JSON and update the state.
        setReports(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('[useResearchLibrary] Failed to load reports from localStorage:', error);
      // In case of an error (e.g., corrupted data), start with a clean slate.
      setReports([]);
    } finally {
      // Mark loading as complete regardless of outcome.
      setIsLoaded(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Effect to save the research library to localStorage whenever the `reports` state changes.
  useEffect(() => {
    // We only want to save to localStorage after the initial load is complete.
    // This prevents a race condition where the initial empty state overwrites stored data.
    if (isLoaded) {
      try {
        const sortedReports = [...reports].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedReports));
      } catch (error) {
        console.error('[useResearchLibrary] Failed to save reports to localStorage:', error);
      }
    }
  }, [reports, isLoaded]); // This effect runs whenever reports or isLoaded changes.

  /**
   * Adds a new report to the beginning of the library.
   * @param newReport - The ResearchReport object to add.
   */
  const addReport = useCallback((newReport: ResearchReport) => {
    setReports((prevReports) => [newReport, ...prevReports]);
  }, []);

  /**
   * Updates an existing report in the library.
   * @param updatedReport - The ResearchReport object with updated data.
   */
  const updateReport = useCallback((updatedReport: ResearchReport) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  }, []);

  /**
   * Removes a report from the library by its ID.
   * @param reportId - The ID of the report to delete.
   */
  const deleteReport = useCallback((reportId: string) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== reportId)
    );
  }, []);

  return { reports, isLoaded, addReport, updateReport, deleteReport };
} 