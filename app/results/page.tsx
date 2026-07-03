"use client";

import React, { useMemo } from "react";
import customerDataRaw from "../../data/customer.json";
import bankAProductsDataRaw from "../../data/bankA-products.json";
import { CustomerData, BankAProducts } from "../../lib/types";
import { generateBankValueProof } from "../../lib/simulation";

import DashboardHeader from "../../components/DashboardHeader";
import OverviewCards from "../../components/OverviewCards";
import FinancialCharts from "../../components/FinancialCharts";
import ProductComparison from "../../components/ProductComparison";
import FDRatesTable from "../../components/FDRatesTable";
import TransactionHistory from "../../components/TransactionHistory";
import { 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck, 
  Clock, 
  Lock
} from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  // Cast raw mock JSON data to our defined types
  const customer = customerDataRaw as CustomerData;
  const bankAProducts = bankAProductsDataRaw as BankAProducts;

  // Run the simulation to get the bank value proof
  const valueProof = useMemo(() => {
    return generateBankValueProof(customer, bankAProducts);
  }, [customer, bankAProducts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
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
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Audit Complete
            </span>
          </div>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-fade">
        
        {/* Interactive Dashboard Header */}
        <DashboardHeader profile={customer.profile} />

        {/* 1. Value Proof Highlight Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-[#1e4b96] rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8 border border-white/10">
          <div className="absolute right-0 top-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute left-0 bottom-0 w-60 h-60 bg-primary-light/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-center">
            {/* Net Savings Box */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-light/20 text-accent-light border border-accent-light/10 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Guaranteed Audit Savings
              </span>
              <p className="text-sm text-white/70">Estimated Net Annual Benefit</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-1 bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
                {formatCurrency(valueProof.totalAnnualValue)}
              </h2>
              <p className="text-xs text-white/50 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                Verified by explainable product comparison
              </p>
            </div>

            {/* Individual Breakdown */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Simulated Value Breakdown (Bank B vs. Bank A)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Savings interest */}
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-white/60 font-medium">Interest Differential</p>
                  <p className={`text-lg font-bold mt-1 ${valueProof.interestGained >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {valueProof.interestGained >= 0 ? "+" : ""}
                    {formatCurrency(valueProof.interestGained)}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 leading-normal">
                    {valueProof.interestGained >= 0 ? "Bank A interest is higher." : "Bank B interest is 0.3% higher."}
                  </p>
                </div>

                {/* Avoidable Fees */}
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-white/60 font-medium">Avoidable Fees</p>
                  <p className="text-lg font-bold mt-1 text-accent">
                    +{formatCurrency(valueProof.feesAvoidable.total)}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 leading-normal">
                    Reduced CC fee + waived ATM fees.
                  </p>
                </div>

                {/* Card Rewards Uplift */}
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-white/60 font-medium">Card Rewards Uplift</p>
                  <p className="text-lg font-bold mt-1 text-emerald-400">
                    +{formatCurrency(valueProof.cardRewardsUplift)}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 leading-normal">
                    5% online Bank A Card rewards rate.
                  </p>
                </div>

                {/* Loan Refinance Savings */}
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-white/60 font-medium">Loan Refinance Savings</p>
                  <p className="text-lg font-bold mt-1 text-emerald-400">
                    +{formatCurrency(valueProof.loanRefinanceSavings)}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 leading-normal">
                    Refinanced rate of {bankAProducts.personalLoans.interestRateMin}% p.a.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top Recommended Switch Actions */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-slate-800">
              Recommended Products for Switch Plan
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProof.recommendedProducts.map((prod, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/15 transition-colors duration-300" />
                
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary-light/50">
                      Recommendation #{idx + 1}
                    </span>
                    <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-0.5">
                      +{formatCurrency(prod.estimatedAnnualBenefit)} <span className="text-[9px] text-slate-400 font-normal">/yr</span>
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {prod.productName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {prod.reason}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Est. setup time: 5 mins
                  </span>
                  <span className="text-xs font-bold text-primary flex items-center gap-0.5 cursor-pointer hover:text-accent transition-colors">
                    Apply Now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Stat Tiles */}
        <OverviewCards summary={customer.accountSummary} />

        {/* comparative chart tools & Fixed Deposit Yield details */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8 items-start">
          <div className="xl:col-span-2">
            <FinancialCharts
              transactions={customer.transactions}
              currentBalance={customer.accountSummary.currentBalance}
            />
          </div>
          <div className="w-full">
            <FDRatesTable fdRates={bankAProducts.fixedDeposits} />
          </div>
        </div>

        {/* AI Recommendations Comparison */}
        <ProductComparison
          summary={customer.accountSummary}
          bankAProducts={bankAProducts}
        />

        {/* Detailed Transaction Ledger */}
        <TransactionHistory transactions={customer.transactions} />

        {/* Start My Switch CTA at the bottom */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-lg p-8 md:p-12 text-center space-y-6 max-w-3xl mx-auto hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-accent-light text-accent flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Ready to lock in your savings?</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium">
              Our secure migration engine helps you request account openings, refinance loans, and move standing instructions to Bank A in just 4 simple steps.
            </p>
          </div>

          <div className="pt-2 flex flex-col items-center gap-4">
            <Link 
              href="/migration"
              className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-hover text-white text-base font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              Start My Switch to Bank A
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Lock className="w-4 h-4 text-emerald-500" />
              Secure encrypted protocol. No commitment.
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
