"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const analysisPhases = [
  {
    title: "Phase 1: Business & Market Analysis",
    description:
      "Understand the company's operations and its competitive landscape.",
  },
  {
    title: "Phase 2: Financial Health & Valuation",
    description: "Dive deep into financial statements and valuation multiples.",
  },
  {
    title: "Phase 3: Moat & Risk Assessment",
    description:
      "Evaluate the durability of the company's competitive advantages and potential risks.",
  },
  {
    title: "Phase 4: Synthesis & Conviction",
    description: "Formulate a final investment thesis and conviction score.",
  },
];

/**
 * Renders the main landing page for the ThesisBuilder application.
 *
 * @returns {React.JSX.Element} The landing page component.
 */
export default function LandingPage(): React.JSX.Element {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/library");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-24 text-center sm:py-32">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              <span className="block">From Ticker to Thesis,</span>
              <span className="block text-primary">Instantly.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              ThesisBuilder transforms a single stock ticker into a
              comprehensive, multi-part investment thesis, saving you hours of
              research.
            </p>
            <div className="mt-10">
              <Button size="lg" onClick={handleGetStarted} disabled={isLoading}>
                {isLoading ? "Loading..." : "Get Started for Free"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Methodology Section */}
      <section id="methodology" className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A Structured, 4-Phase Methodology
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Our analysis is broken down into a logical, 10-step structure to
              ensure every angle is covered, from market analysis to final
              conviction.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {analysisPhases.map((phase) => (
              <Card key={phase.title}>
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{phase.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="border-t bg-primary/5 py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Build Your First Thesis?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Start your analysis in seconds. No credit card required.
          </p>
          <div className="mt-10">
            <Button size="lg" onClick={handleGetStarted} disabled={isLoading}>
              {isLoading ? "Loading..." : "Analyze Your First Stock"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
