"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OverviewChart({ data }: { data: any[] }) {
  const totalIncome = data.filter((t) => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = data.filter((t) => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  return (
    <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 text-base sm:text-lg font-medium text-gray-900 dark:text-white">Financial Overview</h3>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
