import { auth } from "@/lib/auth";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions from "@/components/RecentTransactions";
import OverviewChart from "@/components/OverviewChart";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = parseInt(session.user.id);

  // Fetch summary data
  const txs = await db.select({
    amount: transactions.amount,
    type: transactions.type,
    date: transactions.date,
  }).from(transactions).where(eq(transactions.userId, userId));

  const totalIncome = txs
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = txs
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Fetch recent transactions
  const recentTransactions = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: [desc(transactions.date)],
    limit: 5,
    with: {
      category: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <SummaryCards
        income={totalIncome}
        expense={totalExpense}
        balance={balance}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OverviewChart data={txs} />
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
}
