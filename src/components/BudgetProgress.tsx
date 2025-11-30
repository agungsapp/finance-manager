import { format } from "date-fns";
import Link from "next/link";

interface BudgetProgressProps {
  budgets: Array<{
    id: number;
    amount: number;
    monthYear: string;
    category: {
      id: number;
      name: string;
    } | null;
  }>;
  expenses: Array<{
    categoryId: number | null;
    amount: number;
    date: Date | number;
  }>;
}

export default function BudgetProgress({ budgets, expenses }: BudgetProgressProps) {
  const currentMonth = format(new Date(), "yyyy-MM");
  const currentBudgets = budgets.filter((b) => b.monthYear === currentMonth);

  if (currentBudgets.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Monthly Budget</h3>
          <Link
            href="/budgets"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Set Budget →
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">No budgets set for this month. Click "Set Budget" to create one.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Monthly Budget</h3>
        <Link
          href="/budgets"
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Manage →
        </Link>
      </div>
      <div className="space-y-4">
        {currentBudgets.map((budget) => {
          const spent = expenses
            .filter((e) => e.categoryId === budget.category?.id)
            .reduce((acc, curr) => acc + curr.amount, 0);

          const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
          const isOverBudget = spent > budget.amount;

          return (
            <div key={budget.id}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {budget.category?.name || "Uncategorized"}
                </span>
                <span className={`text-sm font-medium ${isOverBudget ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                  ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full rounded-full transition-all ${isOverBudget
                      ? "bg-red-500"
                      : percentage > 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {percentage.toFixed(0)}% used
                {isOverBudget && " - Over budget!"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
