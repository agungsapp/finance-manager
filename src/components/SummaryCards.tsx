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
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
      <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Balance</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">${balance.toFixed(2)}</p>
          </div>
          <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0 ml-2" />
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Income</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400 truncate">+${income.toFixed(2)}</p>
          </div>
          <ArrowUpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0 ml-2" />
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Expenses</p>
            <p className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400 truncate">-${expense.toFixed(2)}</p>
          </div>
          <ArrowDownCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 flex-shrink-0 ml-2" />
        </div>
      </div>
    </div>
  );
}
