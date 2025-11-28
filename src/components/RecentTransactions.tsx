import { format } from "date-fns";

export default function RecentTransactions({ transactions }: { transactions: any[] }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No recent transactions.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{tx.category?.name || "Uncategorized"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(tx.date), "MMM d, yyyy")}</p>
              </div>
              <span
                className={`font-medium ${tx.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
              >
                {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
