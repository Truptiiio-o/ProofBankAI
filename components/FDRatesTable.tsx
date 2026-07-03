"use client";

import React from "react";
import { Landmark, TrendingUp } from "lucide-react";
import { FixedDepositRate } from "../lib/types";

interface FDRatesTableProps {
  fdRates: FixedDepositRate[];
}

export default function FDRatesTable({ fdRates }: FDRatesTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-primary" />
          Bank A Fixed Deposit Interest Rates (2025/2026)
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Compare FD rates for domestic term deposits below ₹2 Crore.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-6">Tenure Bracket</th>
              <th className="py-3.5 px-6 text-right">General Public (p.a.)</th>
              <th className="py-3.5 px-6 text-right">Senior Citizens (p.a.)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {fdRates.map((rate, idx) => (
              <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-700">{rate.tenure}</td>
                <td className="py-4 px-6 text-right font-bold text-slate-800">{rate.generalRate.toFixed(2)}%</td>
                <td className="py-4 px-6 text-right font-bold text-primary flex items-center justify-end gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  {rate.seniorCitizenRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50/50 p-4 border-t border-slate-100 text-xs text-slate-400">
        * Rates are indicative and approximate. Senior citizen benefits apply to residents aged 60 and above.
      </div>
    </div>
  );
}
