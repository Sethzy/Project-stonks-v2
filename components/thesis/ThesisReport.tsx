import React from "react";
import { ResearchReport } from "@/types/thesis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnalysisCard } from "./AnalysisCard";

interface ThesisReportProps {
  report: ResearchReport;
}

/**
 * Renders the main investment thesis report, including a sticky header,
 * executive summary, conviction scores, and the detailed 4-phase analysis.
 *
 * @param {ThesisReportProps} props The properties for the component.
 * @returns {React.JSX.Element} The rendered thesis report.
 */
export function ThesisReport({ report }: ThesisReportProps): React.JSX.Element {
  // A completed report is expected here, but we use optional chaining for safety.
  const convictionScore = report.overallConvictionScore ?? 0;
  const executiveSummary =
    report.executiveSummary?.summary ?? "No summary available.";
  const convictionScores = report.executiveSummary?.convictionScores ?? [];
  const analysisPhases = report.analysis?.phases ?? [];

  return (
    <div className="bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="text-xl font-bold">{report.companyName}</h1>
            <p className="text-sm text-muted-foreground">{report.ticker}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">Conviction Score:</span>
            <span className="text-lg font-bold text-primary">
              {convictionScore.toFixed(1)}/10
            </span>
          </div>
        </div>
      </header>

      {/* Report Body */}
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 md:grid-cols-3">
        {/* Left Rail: Executive Summary & Scores */}
        <aside className="md:col-span-1">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{executiveSummary}</p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Conviction Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {convictionScores.map((score, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{score.title}</span>
                    <span className="font-bold text-primary">
                      {score.score.toFixed(1)}/10
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Right Rail: 4-Phase Analysis */}
        <div className="space-y-8 md:col-span-2">
          {analysisPhases.map((phase) => (
            <section key={phase.title}>
              <h2 className="mb-1 text-2xl font-semibold tracking-tight">
                {phase.title}
              </h2>
              <div className="space-y-6">
                {phase.steps.map((step) => (
                  <AnalysisCard
                    key={step.title}
                    step={{ ...step, details: step.insights }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
