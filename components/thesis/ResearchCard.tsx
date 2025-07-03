"use client";

/**
 * @file Defines the ResearchCard component.
 * This component displays a single research report, with different styles
 * and actions depending on its status ('pending' or 'complete').
 */

import Link from "next/link";
import { type ResearchReport } from "@/types/thesis";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

/**
 * Props for the ResearchCard component.
 */
interface ResearchCardProps {
  /**
   * The research report data to display.
   */
  report: ResearchReport;
  /**
   * A function to handle the deletion of the report.
   */
  onDelete: (reportId: string) => void;
}

/**
 * A card that visualizes a research report.
 * It shows a pending state with a spinner or a completed state
 * with a conviction score and a link to the full report.
 *
 * @param {ResearchCardProps} props - The component props.
 * @returns {JSX.Element} The rendered card component.
 */
export function ResearchCard({ report, onDelete }: ResearchCardProps) {
  const isPending = report.status === "pending";

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="truncate">{report.companyName}</CardTitle>
        <p className="text-sm text-muted-foreground">{report.ticker}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending ? (
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-foreground">
              Conviction Score
            </p>
            <p className="text-3xl font-bold text-primary">
              {report.overallConvictionScore?.toFixed(1) ?? "N/A"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(report.id)}
          aria-label="Delete report"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Link href={`/report/${report.id}`} passHref>
          <Button disabled={isPending}>View Report</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
