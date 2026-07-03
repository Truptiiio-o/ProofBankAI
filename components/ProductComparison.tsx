"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRightLeft, Sparkles, Info } from "lucide-react";
import { AccountSummary, BankAProducts } from "../lib/types";

interface ProductComparisonProps {
  summary: AccountSummary;
  bankAProducts: BankAProducts;
}

export default function ProductComparison({ summary, bankAProducts }: ProductComparisonProps) {
  const [activeTab, setActiveTab] = useState<"savings" | "cards" | "loans">("savings");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Savings comparison calculation
  const currentSavingsInterest = (summary.averageMonthlyBalance * summary.savingsInterestRate) / 100;
  
  // Find applicable Bank A tier interest rate
  const bankATier = bankAProducts.savingsAccount.tiers.find((tier) => {
    if (tier.balanceRange.includes("Above")) {
      return summary.averageMonthlyBalance > 1000000;
    }
    return summary.averageMonthlyBalance <= 1000000;
  });
  const bankASavingsRate = bankATier ? bankATier.interestRate : 2.70;
  const bankASavingsInterest = (summary.averageMonthlyBalance * bankASavingsRate) / 100;
  const savingsDiff = bankASavingsInterest - currentSavingsInterest;

  // Credit Card comparison
  const bankACardOpt = bankAProducts.creditCards[0]; // Cashback Bank A Card
  const currentCardFee = summary.creditCard.annualFee;
  const bankACardFee = bankACardOpt.annualFee;
  const cardFeeDiff = currentCardFee - bankACardFee;

  // Personal Loan comparison
  const currentLoanRate = summary.personalLoan.interestRate;
  const bankALoanMin = bankAProducts.personalLoans.interestRateMin;
  const loanRateDiff = currentLoanRate - bankALoanMin;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-accent" />
              Comparative Product Audit: Bank B vs. Bank A
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Analyzing savings, credit cards, and personal loans against Bank A rates.
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg self-start">
            <button
              onClick={() => setActiveTab("savings")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "savings" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Savings
            </button>
            <button
              onClick={() => setActiveTab("cards")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "cards" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Credit Cards
            </button>
            <button
              onClick={() => setActiveTab("loans")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "loans" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Personal Loans
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {activeTab === "savings" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <span className="text-xs text-slate-400 font-medium">Bank B Savings Max</span>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{summary.savingsInterestRate}%</p>
                  <p className="text-xs text-slate-400 mt-1">Est. Yearly Earn: {formatCurrency(currentSavingsInterest)}</p>
                </div>
                <div className="p-4 rounded-xl border border-accent-light bg-accent-light/10">
                  <span className="text-xs text-accent font-semibold flex items-center gap-1">
                    Bank A Savings
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <p className="text-2xl font-bold text-primary mt-1">{bankASavingsRate}%</p>
                  <p className="text-xs text-slate-400 mt-1">Est. Yearly Earn: {formatCurrency(bankASavingsInterest)}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex gap-3 text-xs text-slate-500">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-600">Bank A Savings Account Tiers (as of 2025/2026):</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    {bankAProducts.savingsAccount.tiers.map((t, idx) => (
                      <li key={idx}>
                        Balance {t.balanceRange}: <strong>{t.interestRate}% p.a.</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-rose-100 bg-rose-50/30 flex flex-col justify-between">
              <div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                  Recommendation
                </span>
                <h4 className="text-base font-bold text-rose-800 mt-3 flex items-center gap-1.5">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  Keep Current Account
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your current Bank B account yields a higher interest rate (<strong>{summary.savingsInterestRate}%</strong>) compared to Bank A&apos;s rate of <strong>{bankASavingsRate}%</strong> for your balance bracket of {formatCurrency(summary.averageMonthlyBalance)}.
                </p>
              </div>
              <div className="mt-4 border-t border-rose-100/50 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Net Yearly Loss if Switched:</span>
                <span className="font-bold text-rose-600">{formatCurrency(Math.abs(savingsDiff))}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <span className="text-xs text-slate-400 font-medium">Bank B Card Fee / Reward</span>
                  <p className="text-xl font-bold text-slate-800 mt-1">₹{summary.creditCard.annualFee}</p>
                  <p className="text-xs text-slate-400 mt-1">Reward Rate: <strong>{summary.creditCard.rewardRate}%</strong></p>
                </div>
                <div className="p-4 rounded-xl border border-accent-light bg-accent-light/10">
                  <span className="text-xs text-accent font-semibold flex items-center gap-1">
                    Bank A Card Option
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <p className="text-xl font-bold text-primary mt-1">₹{bankACardOpt.annualFee}</p>
                  <p className="text-xs text-slate-400 mt-1">Reward Rate: <strong>{bankACardOpt.rewardRate}%</strong></p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex gap-3 text-xs text-slate-500">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-600">Available Bank A Card Options:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    {bankAProducts.creditCards.map((card, idx) => (
                      <li key={idx}>
                        <strong>{card.name}</strong>: Fee ₹{card.annualFee}/yr. {card.benefits}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/30 flex flex-col justify-between">
              <div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Recommendation
                </span>
                <h4 className="text-base font-bold text-emerald-800 mt-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Switch to Bank A Card
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Switching to the <strong>{bankACardOpt.name}</strong> would save you <strong>{formatCurrency(cardFeeDiff)}</strong> annually in fees and provide a substantially higher reward rate (<strong>{bankACardOpt.rewardRate}%</strong> cashback on online purchases).
                </p>
              </div>
              <div className="mt-4 border-t border-emerald-100/50 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Net Fee Saved Yearly:</span>
                <span className="font-bold text-emerald-600">{formatCurrency(cardFeeDiff)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <span className="text-xs text-slate-400 font-medium">Bank B Loan Interest</span>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{summary.personalLoan.interestRate}%</p>
                  <p className="text-xs text-slate-400 mt-1">Active EMI: {formatCurrency(summary.personalLoan.monthlyEmi)}/mo</p>
                </div>
                <div className="p-4 rounded-xl border border-accent-light bg-accent-light/10">
                  <span className="text-xs text-accent font-semibold flex items-center gap-1">
                    Bank A Xpress Credit
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {bankAProducts.personalLoans.interestRateMin}%
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Range: {bankAProducts.personalLoans.interestRateMin}% - {bankAProducts.personalLoans.interestRateMax}%
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex gap-3 text-xs text-slate-500">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-600">Bank A Personal Loan Features:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Rate range: <strong>{bankAProducts.personalLoans.interestRateMin}% to {bankAProducts.personalLoans.interestRateMax}%</strong></li>
                    <li>Processing Fee: {bankAProducts.personalLoans.processingFee}</li>
                    <li>Max Tenure: {bankAProducts.personalLoans.maxTenureMonths} months</li>
                  </ul>
                </div>
              </div>
            </div>

            {loanRateDiff > 0 ? (
              <div className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/30 flex flex-col justify-between">
                <div>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Recommendation
                  </span>
                  <h4 className="text-base font-bold text-emerald-800 mt-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Refinance Loan
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Refinancing your loan to Bank A would reduce your interest rate from <strong>{currentLoanRate}%</strong> to the baseline rate of <strong>{bankALoanMin}%</strong>, saving you approximately <strong>{formatCurrency((summary.personalLoan.principal * loanRateDiff) / 100)}</strong> in interest annually.
                  </p>
                </div>
                <div className="mt-4 border-t border-emerald-100/50 pt-4 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Net Interest Saved Yearly:</span>
                  <span className="font-bold text-emerald-600">{formatCurrency((summary.personalLoan.principal * loanRateDiff) / 100)}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col justify-between">
                <div>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                    Recommendation
                  </span>
                  <h4 className="text-base font-bold text-amber-800 mt-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Keep Existing Loan
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Your active loan interest rate of <strong>{currentLoanRate}%</strong> is already lower than Bank A&apos;s baseline personal loan rate of <strong>{bankALoanMin}%</strong>. Moving/refinancing the loan is not advised.
                  </p>
                </div>
                <div className="mt-4 border-t border-amber-100/50 pt-4 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Interest Premium if Switched:</span>
                  <span className="font-bold text-amber-600">+{Math.abs(loanRateDiff).toFixed(2)}% p.a.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
