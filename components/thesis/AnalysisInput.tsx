"use client";

/**
 * @file Defines the AnalysisInput component.
 * This component provides a user interface for entering a stock ticker
 * and initiating the analysis process.
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Props for the AnalysisInput component.
 */
interface AnalysisInputProps {
  /**
   * Function to be called when the user initiates an analysis.
   * It receives the stock ticker as an argument.
   */
  onAnalyze: (ticker: string) => void;
}

/**
 * A form component with an input field for a stock ticker and a button
 * to trigger the analysis.
 *
 * @param {AnalysisInputProps} props - The component props.
 * @returns {JSX.Element} The rendered form.
 */
export function AnalysisInput({ onAnalyze }: AnalysisInputProps) {
  const [ticker, setTicker] = useState("");

  /**
   * Handles the form submission event.
   * It prevents the default form action, validates the input,
   * calls the onAnalyze callback, and clears the input field.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTicker = ticker.trim();
    if (!trimmedTicker) return; // Prevent submission of empty tickers.

    onAnalyze(trimmedTicker);
    setTicker(""); // Reset the input field after submission.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Enter a stock ticker (e.g., AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        aria-label="Stock Ticker Input"
      />
      <Button type="submit" disabled={!ticker.trim()}>
        Analyze
      </Button>
    </form>
  );
}
