"use client";

import React from "react";
import { Wallet, Landmark, TrendingUp, ShieldAlert, Award } from "lucide-react";
import { AccountSummary } from "../lib/types";

interface OverviewCardsProps {
  summary: AccountSummary;
}

export default function OverviewCards({ summary }: OverviewCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Current Balance */}
      <div className="group relative rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:border-primary-light hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Wallet className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            Active
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500">Current Balance</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">
          {formatCurrency(summary.currentBalance)}
        </h3>
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          At {summary.savingsInterestRate}% p.a. interest rate
        </p>
      </div>

      {/* Average Monthly Balance */}
      <div className="group relative rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:border-primary-light hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-accent-light text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            <Landmark className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            Healthy
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500">Avg Monthly Balance (AMB)</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">
          {formatCurrency(summary.averageMonthlyBalance)}
        </h3>
        <p className="text-xs text-slate-400 mt-2">
          Required AMB limit is fully met
        </p>
      </div>

      {/* Credit Card Details */}
      <div className="group relative rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:border-primary-light hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
            {summary.creditCard.name.split(" ").slice(-1)[0]}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500">Active Credit Card</p>
        <h3 className="text-lg font-bold text-slate-800 mt-1 truncate">
          {summary.creditCard.name}
        </h3>
        <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
          <span>Fee: ₹{summary.creditCard.annualFee}/yr</span>
          <span className="font-semibold text-accent">{summary.creditCard.rewardRate}% Rewards</span>
        </div>
      </div>

      {/* Active Loan Details */}
      <div className="group relative rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:border-primary-light hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
            {summary.personalLoan.remainingMonths}m left
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500">Personal Loan EMI</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">
          {formatCurrency(summary.personalLoan.monthlyEmi)}
          <span className="text-xs text-slate-400 font-normal"> /mo</span>
        </h3>
        <p className="text-xs text-slate-400 mt-2 truncate">
          Principal: {formatCurrency(summary.personalLoan.principal)} @ {summary.personalLoan.interestRate}%
        </p>
      </div>
    </div>
  );
}
