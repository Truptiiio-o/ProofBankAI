"use client";

import React from "react";
import { Landmark, User, CreditCard } from "lucide-react";
import { CustomerProfile } from "../lib/types";

interface DashboardHeaderProps {
  profile: CustomerProfile;
}

export default function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <header className="relative w-full rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-accent p-6 text-white shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-accent-light/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-accent-light border border-white/10 mb-3 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Live Financial Profile
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            ProofBank AI Dashboard
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            A comprehensive, AI-powered audit of your current assets, active accounts, and comparative banking products.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/15 text-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider">Account Holder</p>
              <p className="font-semibold text-sm">{profile.name}</p>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/15 text-accent">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider">Primary Bank</p>
              <p className="font-semibold text-sm">{profile.bankName}</p>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/15 text-accent">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider">Account Type</p>
              <p className="font-semibold text-sm">{profile.accountType}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
