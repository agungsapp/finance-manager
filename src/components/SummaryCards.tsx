import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

export default function SummaryCards({
  income,
  expense,
  balance,
}: {
  income: number;
  expense: number;
  balance: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${balance.toFixed(2)}</p>
          </div>
          <Wallet className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+${income.toFixed(2)}</p>
          </div>
          <ArrowUpCircle className="h-8 w-8 text-green-500" />
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">-${expense.toFixed(2)}</p>
          </div>
          <ArrowDownCircle className="h-8 w-8 text-red-500" />
        </div>
      </div>
    </div>
  );
}
