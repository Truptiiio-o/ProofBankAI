"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Lock,
  Sparkles,
  Settings2,
  AlertCircle
} from "lucide-react";

interface StepConfig {
  id: number;
  title: string;
  description: string;
  successText: string;
  isOptional?: boolean;
}

export default function MigrationPage() {
  const [isClosureEnabled, setIsClosureEnabled] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps: StepConfig[] = [
    {
      id: 1,
      title: "KYC Verification",
      description: "Verifying Aadhaar and PAN authentication securely via Aadhaar sandbox",
      successText: "KYC Verified successfully (Aadhaar Linked)"
    },
    {
      id: 2,
      title: "Bank A Savings Account Opening",
      description: "Creating a premium Bank A Savings Max Account with pre-approved features",
      successText: "Account opened: Bank A Savings Max XXXX8890"
    },
    {
      id: 3,
      title: "Mandate Transfer",
      description: "Transferring TechCorp Salary credit, Mutual Fund SIP, and utility standing instructions",
      successText: "3 mandate transfers established successfully"
    },
    {
      id: 4,
      title: "Credit Card Issuance",
      description: "Provisioning your Cashback Bank A Card with customized reward parameters",
      successText: "Card approved: Cashback Bank A Card dispatched"
    },
    {
      id: 5,
      title: "Old Account Closure",
      description: "Requesting closure of Bank B account and balance repatriation",
      successText: "Bank B account closure request filed",
      isOptional: true
    }
  ];

  const handleStartMigration = () => {
    setIsRunning(true);
    setCompletedSteps([]);
    setActiveStep(1);
    setShowSuccess(false);
  };

  useEffect(() => {
    if (!isRunning || activeStep === null) return;

    // Check if the current step should be skipped (Step 5 if closure toggle is false)
    if (activeStep === 5 && !isClosureEnabled) {
      // Complete execution without running step 5
      setIsRunning(false);
      setActiveStep(null);
      setShowSuccess(true);
      return;
    }

    const timer = setTimeout(() => {
      // Mark active step as completed
      setCompletedSteps(prev => [...prev, activeStep]);

      // Move to the next step
      const nextStep = activeStep + 1;
      if (nextStep > steps.length) {
        setIsRunning(false);
        setActiveStep(null);
        setShowSuccess(true);
      } else if (nextStep === 5 && !isClosureEnabled) {
        // Skip step 5 if closure is disabled
        setIsRunning(false);
        setActiveStep(null);
        setShowSuccess(true);
      } else {
        setActiveStep(nextStep);
      }
    }, 1000); // 1-second staggered delay

    return () => clearTimeout(timer);
  }, [isRunning, activeStep, isClosureEnabled, steps.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* Brand Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/results" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold shadow-md shadow-primary/20">
                P
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ProofBank.AI
                </span>
                <span className="text-[10px] block font-semibold text-slate-400 -mt-1 tracking-widest uppercase">
                  Audit Engine
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            256-Bit SSL Handshake
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-fade">
        
        {/* Back Link */}
        <Link 
          href="/results" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Audit Dashboard
        </Link>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Onboarding & Migration Board</h1>
          <p className="text-slate-500 text-sm font-medium">
            Simulate your secure account opening, refinancing, and payment mandate transition to Bank A.
          </p>
        </div>

        {/* Configuration Segment */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between gap-6 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Settings2 className="w-4.5 h-4.5 text-primary" />
                Customize Switch Flow
              </h3>
              <p className="text-xs text-slate-400 font-medium">Configure advanced integration mandates before starting.</p>
            </div>
            
            {/* Toggle switch for old account closure */}
            <div className="flex items-center gap-3">
              <label htmlFor="closure-toggle" className="text-xs font-bold text-slate-500 select-none cursor-pointer">
                Close Old Bank B Account
              </label>
              <button
                id="closure-toggle"
                disabled={isRunning}
                onClick={() => setIsClosureEnabled(!isClosureEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isClosureEnabled ? "bg-primary" : "bg-slate-200"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isClosureEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <AlertCircle className="w-4 h-4 text-primary shrink-0" />
              <span>KYC sandbox endpoints are fully loaded and mock pre-authorized.</span>
            </div>

            <button
              onClick={handleStartMigration}
              disabled={isRunning}
              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? "Automated Switch Executing..." : "Start Automated Switch Engine"}
            </button>
          </div>
        </div>

        {/* Stepper Checklist */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isActive = activeStep === step.id;
              const isSkipped = step.id === 5 && !isClosureEnabled && !isRunning && completedSteps.length > 0;

              return (
                <div 
                  key={step.id} 
                  className={`p-6 flex items-start gap-4 transition-colors duration-300 ${
                    isActive ? "bg-blue-50/20" : ""
                  } ${isSkipped ? "opacity-40" : ""}`}
                >
                  {/* Status indicator icon/number */}
                  <div className="shrink-0 flex items-center justify-center mt-0.5">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow shadow-emerald-500/20 animate-scale-in">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isActive ? (
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : isSkipped ? (
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold border border-slate-200">
                        —
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-xs font-bold border border-slate-200">
                        {step.id}
                      </div>
                    )}
                  </div>

                  {/* Step information text */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-extrabold ${isCompleted ? "text-emerald-700" : "text-slate-800"}`}>
                        {step.title}
                      </h3>
                      {step.isOptional && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 uppercase tracking-wider">
                          Optional
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {isCompleted ? step.successText : step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Onboarding Success Banner */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center space-y-6 shadow-sm animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">Welcome to Bank A!</h2>
              <p className="text-xs md:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed font-semibold">
                Your onboarding is complete. Your Financial Twin will now continue monitoring your goals and tracking savings leakage.
              </p>
            </div>

            <div className="pt-2">
              <Link 
                href="/results"
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all hover:-translate-y-0.5"
              >
                View Ongoing Engagement Dashboard
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
