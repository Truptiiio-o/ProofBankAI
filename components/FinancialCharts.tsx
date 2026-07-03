"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Transaction } from "../lib/types";
import { BarChart, Percent } from "lucide-react";

interface FinancialChartsProps {
  transactions: Transaction[];
  currentBalance: number;
}

const COLORS = [
  "#0B3D91", // Primary Deep Blue
  "#00B8A9", // Accent Teal
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#3B82F6", // Light Blue
  "#EC4899", // Pink
];

export default function FinancialCharts({ transactions, currentBalance }: FinancialChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute daily balance trend
  const balanceData = React.useMemo(() => {
    // Sort transactions chronologically (oldest first)
    const sortedTxs = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate historical seed balance
    let balance = currentBalance;
    // Go backwards to find starting balance
    for (let i = transactions.length - 1; i >= 0; i--) {
      const tx = transactions[i];
      if (tx.type === "credit") {
        balance -= tx.amount;
      } else {
        balance += tx.amount;
      }
    }

    // Now roll forward
    let currentTempBalance = balance;
    const dailyBalances: { date: string; balance: number }[] = [];

    // Add starting point
    if (sortedTxs.length > 0) {
      const firstDate = new Date(sortedTxs[0].date);
      const dayBefore = new Date(firstDate.getTime() - 24 * 60 * 60 * 1000);
      dailyBalances.push({
        date: dayBefore.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        balance: Math.round(currentTempBalance),
      });
    }

    sortedTxs.forEach((tx) => {
      if (tx.type === "credit") {
        currentTempBalance += tx.amount;
      } else {
        currentTempBalance -= tx.amount;
      }
      dailyBalances.push({
        date: new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        balance: Math.round(currentTempBalance),
      });
    });

    return dailyBalances;
  }, [transactions, currentBalance]);

  // Compute expenditure by category
  const expensePieData = React.useMemo(() => {
    const categories: Record<string, number> = {};
    transactions
      .filter((tx) => tx.type === "debit" && tx.category !== "Loan EMI" && tx.category !== "Mutual Fund SIP")
      .forEach((tx) => {
        categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
      });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 min-h-[350px]">
        <div className="lg:col-span-2 bg-slate-50 rounded-xl animate-pulse" />
        <div className="bg-slate-50 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Balance Trend Area Chart */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" />
          Account Balance Trend (INR)
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0B3D91" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value || 0)), "Balance"]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#0B3D91"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Spend Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-accent" />
            Monthly Discretionary Spend
          </h3>
          <div className="h-[200px] w-full relative flex items-center justify-center">
            {expensePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {expensePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value || 0)), "Spent"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-sm">No expenses to display</p>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 uppercase font-medium">Total Spent</span>
              <span className="text-lg font-bold text-slate-700">
                {formatCurrency(expensePieData.reduce((sum, item) => sum + item.value, 0))}
              </span>
            </div>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs">
          {expensePieData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-slate-600">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="truncate max-w-[100px]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
