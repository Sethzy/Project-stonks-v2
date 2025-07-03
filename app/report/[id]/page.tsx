"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useResearchLibrary } from "@/hooks/useResearchLibrary";
import { ThesisReport } from "@/components/thesis/ThesisReport";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ResearchReport } from "@/types/thesis";

/**
 * Renders the specific investment thesis report page.
 *
 * @returns {React.JSX.Element} The component for the report page.
 */
function ReportPage(): React.JSX.Element {
  const params = useParams();
  const { reports, isLoaded } = useResearchLibrary();
  const [report, setReport] = useState<ResearchReport | null | undefined>(
    undefined
  );

  const id = params.id as string;

  useEffect(
    function findReport() {
      // Reason: This effect locates the specific report from the library once the reports are loaded.
      // It prevents re-renders by only updating the state if the found report is different from the current one.
      if (isLoaded) {
        const foundReport = reports.find((r) => r.id === id) || null;
        setReport(foundReport);
      }
    },
    [id, isLoaded, reports]
  );

  if (!isLoaded || report === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Report not found.</p>
      </div>
    );
  }

  return <ThesisReport report={report} />;
}

export default ReportPage;
