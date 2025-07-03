"use client";

/**
 * @file Defines the ResearchLibrary component.
 * This component is responsible for rendering the list of research reports,
 * both pending and completed.
 */

import { type ResearchReport } from "@/types/thesis";
import { ResearchCard } from "./ResearchCard";

/**
 * Props for the ResearchLibrary component.
 */
interface ResearchLibraryProps {
  /**
   * An array of research reports to be displayed.
   */
  reports: ResearchReport[];
  /**
   * A function to handle the deletion of a report.
   * This will be passed down to each ResearchCard.
   */
  onDelete: (reportId: string) => void;
}

/**
 * Renders a grid of research report cards.
 *
 * @param {ResearchLibraryProps} props - The component props.
 * @returns {JSX.Element} A grid layout of report cards.
 */
export function ResearchLibrary({ reports, onDelete }: ResearchLibraryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ResearchCard key={report.id} report={report} onDelete={onDelete} />
      ))}
    </div>
  );
}
