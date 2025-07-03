"use client";

/**
 * @file This file defines the Research Library page.
 * It serves as the main dashboard for users to initiate new investment
 * thesis analyses and view their library of pending and completed reports.
 * This component integrates the core hooks for state management and
 * orchestrates the main user workflow.
 */

import { useEffect, useState } from "react";
import { useResearchLibrary } from "@/hooks/useResearchLibrary";
import { useThesisGeneration } from "@/hooks/useThesisGeneration";
import { AnalysisInput } from "@/components/thesis/AnalysisInput";
import { ResearchLibrary } from "@/components/thesis/ResearchLibrary";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "sonner";

function LibrarySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

/**
 * The main component for the Research Library page.
 * It initializes the core hooks to manage report state and trigger analysis,
 * laying the groundwork for the interactive components.
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function ResearchLibraryPage() {
  // Core hooks for managing library state and generation logic.
  const { reports, isLoaded, addReport, updateReport, deleteReport } =
    useResearchLibrary();
  const { startAnalysis } = useThesisGeneration({ addReport, updateReport });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto min-h-screen p-4 py-8 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Research Library
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your central hub for generating and managing investment theses.
        </p>
      </header>

      <main className="space-y-8">
        <section aria-labelledby="analysis-input-heading">
          {/*
            This is the AnalysisInput component (Task 2.2).
            It handles the ticker input and triggers the `startAnalysis` function.
          */}
          <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h2
              id="analysis-input-heading"
              className="mb-4 text-xl font-semibold"
            >
              New Analysis
            </h2>
            <AnalysisInput onAnalyze={startAnalysis} />
          </div>
        </section>

        <section aria-labelledby="report-library-heading">
          <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h2
              id="report-library-heading"
              className="mb-4 text-xl font-semibold"
            >
              Reports
            </h2>
            {!isMounted || !isLoaded ? (
              <LibrarySkeleton />
            ) : reports.length === 0 ? (
              <p className="text-muted-foreground">
                No reports found. Enter a ticker above to begin your first
                analysis.
              </p>
            ) : (
              <ResearchLibrary reports={reports} onDelete={deleteReport} />
            )}
          </div>
        </section>
      </main>

      {/* Toaster component for displaying notifications (e.g., "Analysis started!"). */}
      <Toaster />
    </div>
  );
}
