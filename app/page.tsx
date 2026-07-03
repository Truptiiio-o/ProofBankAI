"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Terminal, 
  ArrowRight, 
  Sparkles,
  Lock
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              v1.0.0-beta
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-12 md:py-20 relative overflow-hidden animate-page-fade">
        {/* Decorative subtle background graphics */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none -mr-48" />
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-accent-light/35 rounded-full blur-3xl pointer-events-none -ml-48" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-light/50 mb-6 animate-fade-in-down">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Next-Gen Banking Audit Engine
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Try Before <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">You Switch.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              See exactly how much better your finances would be at Bank A — before you open an account. Run a secure, private simulation using your actual banking data.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/connect" 
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
              >
                See My Bank Value Proof
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold px-4 py-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                <Lock className="w-4 h-4 text-emerald-500" />
                No credentials shared. Bank-grade security.
              </div>
            </div>
          </div>

          {/* Feature Grid Section (Below the fold) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Connect Securely */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Connect Securely</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect your account securely via official Account Aggregator consent. Select only the accounts you wish to review. Access is 100% read-only and temporary.
              </p>
            </div>

            {/* Card 2: We Simulate */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">We Simulate</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our audit engine matches your transaction history, loan terms, and credit card spends against Bank A&apos;s real product parameters and latest 2025/2026 rates.
              </p>
            </div>

            {/* Card 3: See Your Proof */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">See Your Proof</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Review transparent, line-by-line financial metrics. See exactly how much you can earn or save across savings accounts, deposits, credit cards, and loans.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-semibold">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ProofBank.AI. Simulated analysis only.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Security Protocol</span>
            <span className="hover:text-slate-600 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-600 cursor-pointer">Live Bank A Rates</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
