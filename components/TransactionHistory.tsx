"use client";

import React, { useState, useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight, Search, SlidersHorizontal, Eye } from "lucide-react";
import { Transaction } from "../lib/types";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((tx) => tx.category));
    return ["all", ...Array.from(cats)];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || tx.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || tx.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Salary Credit":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Mutual Fund SIP":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Grocery":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "ATM Withdrawal":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Credit Card Payment":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Loan EMI":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Transaction Audit (Last 90 Days)
        </h3>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search description..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "all" | "credit" | "debit")}
              className="text-xs sm:text-sm rounded-lg border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer text-slate-600"
            >
              <option value="all">All Types</option>
              <option value="credit">Credits Only</option>
              <option value="debit">Debits Only</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs sm:text-sm rounded-lg border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer text-slate-600 max-w-[150px] sm:max-w-none"
            >
              <option value="all">All Categories</option>
              {categories
                .filter((cat) => cat !== "all")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Description</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 text-slate-500 font-medium whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex p-1 rounded-full ${
                          tx.type === "credit"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {tx.type === "credit" ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </span>
                      {tx.description}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColor(
                        tx.category
                      )}`}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-bold whitespace-nowrap ${
                      tx.type === "credit" ? "text-emerald-600" : "text-slate-800"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No transactions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer statistics */}
      <div className="bg-slate-50/40 p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between text-xs text-slate-500 gap-2">
        <div>
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex gap-4">
          <span>
            Total Debit:{" "}
            <strong className="text-rose-600 font-semibold">
              {formatCurrency(
                filteredTransactions
                  .filter((t) => t.type === "debit")
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
            </strong>
          </span>
          <span>
            Total Credit:{" "}
            <strong className="text-emerald-600 font-semibold">
              {formatCurrency(
                filteredTransactions
                  .filter((t) => t.type === "credit")
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
