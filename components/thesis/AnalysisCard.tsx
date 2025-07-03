import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AnalysisCardProps {
  step: {
    title: string;
    summary: string;
    details: string[];
  };
}

/**
 * A static card for displaying a single step of the investment analysis.
 *
 * @param {AnalysisCardProps} props The properties for the component.
 * @returns {React.JSX.Element} The rendered static analysis card.
 */
export function AnalysisCard({ step }: AnalysisCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{step.summary}</p>
        <ul className="mb-6 list-disc space-y-2 pl-5">
          {step.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" disabled>
            Sources
          </Button>
          <Button variant="outline" disabled>
            Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
