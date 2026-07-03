"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  CheckSquare, 
  Square, 
  Loader2, 
  Info,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface AccountOption {
  id: string;
  name: string;
  type: string;
  maskedNo: string;
}

export default function ConnectPage() {
  const router = useRouter();
  
  // Consent checkboxes state
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([
    "bankC_savings",
    "bankB_card",
    "personal_loan"
  ]);

  // Loading animation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const accountOptions: AccountOption[] = [
    { id: "bankC_savings", name: "Bank C Savings Account", type: "Savings Account", maskedNo: "XXXX9012" },
    { id: "bankB_card", name: "Bank B Credit Card", type: "Credit Card", maskedNo: "XXXX5521" },
    { id: "personal_loan", name: "Personal Loan Account", type: "Personal Loan", maskedNo: "XXXX9908" }
  ];

  const toggleAccount = (id: string) => {
    if (selectedAccounts.includes(id)) {
      setSelectedAccounts(selectedAccounts.filter(item => item !== id));
    } else {
      setSelectedAccounts([...selectedAccounts, id]);
    }
  };

  const handleGrantConsent = () => {
    if (selectedAccounts.length === 0) {
      alert("Please select at least one account to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    setLoadingStep(1); // "Connecting to your accounts..."
  };

  // Step transitions
  useEffect(() => {
    if (!isSubmitting) return;

    const timer1 = setTimeout(() => {
      setLoadingStep(2); // "Building your Financial Twin..."
    }, 1000);

    const timer2 = setTimeout(() => {
      router.push("/results");
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isSubmitting, router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Brand Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
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
            256-Bit SSL Encryption
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center p-4 py-12 relative overflow-hidden animate-page-fade">
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white transition-opacity duration-300">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center max-w-sm text-center">
              <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
              
              <div className="space-y-2 h-16">
                {loadingStep === 1 && (
                  <div className="animate-pulse">
                    <h3 className="text-lg font-bold text-white">Connecting to Accounts</h3>
                    <p className="text-xs text-white/60 mt-1">Establishing secure sandbox handshake with bank gateways...</p>
                  </div>
                )}
                {loadingStep === 2 && (
                  <div className="animate-pulse">
                    <h3 className="text-lg font-bold text-accent">Building Financial Twin</h3>
                    <p className="text-xs text-white/60 mt-1">Injecting transaction profiles and computing Bank A value proof...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white text-center relative">
            <div className="absolute right-4 top-4 bg-white/10 p-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Consent Manager</h2>
            <p className="text-xs text-white/70 mt-1">Official Account Aggregator Sandbox Flow</p>
          </div>

          <div className="p-6 space-y-6">
            
            {/* FIU Context */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 text-xs">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Requesting Organization:</p>
                <p className="text-slate-500">ProofBank.AI (Financial Information User)</p>
                <p className="font-semibold text-slate-700 mt-2">Purpose of Request:</p>
                <p className="text-slate-500">Compare existing fees, yields, and rates to create a live Bank A Bank Value Proof.</p>
              </div>
            </div>

            {/* Account List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select Accounts to Audit
              </span>

              <div className="space-y-2">
                {accountOptions.map((acc) => {
                  const isChecked = selectedAccounts.includes(acc.id);
                  return (
                    <div 
                      key={acc.id}
                      onClick={() => toggleAccount(acc.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked 
                          ? "border-primary bg-primary-light/30 shadow-sm" 
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isChecked ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{acc.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{acc.type} • {acc.maskedNo}</p>
                        </div>
                      </div>
                      
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        isChecked 
                          ? "bg-primary-light text-primary border-primary-light/50"
                          : "bg-slate-50 text-slate-400 border-slate-100"
                      }`}>
                        Mock Data
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Privacy Disclaimer */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 flex gap-3 text-xs text-slate-600">
              <Calendar className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800">Consent Details & Security Policy</p>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500">
                  <li>Data shared for 24 hours, for simulation purposes only.</li>
                  <li>You can revoke access anytime from the dashboard.</li>
                  <li>Read-only transaction access, cannot perform actions.</li>
                </ul>
              </div>
            </div>

            {/* Consent CTA */}
            <button
              onClick={handleGrantConsent}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md shadow-primary/10 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-accent" />
              Grant Consent & Continue
            </button>

            <Link 
              href="/" 
              className="block text-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Cancel Request & Return to Home
            </Link>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-4 text-center text-[10px] text-slate-400 font-semibold">
        Approved by Sahamati Account Aggregator Sandbox Framework
      </footer>
    </div>
  );
}
