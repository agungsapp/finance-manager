import { auth } from "@/lib/auth";
import { db } from "@/db";
import { transactions, budgets } from "@/db/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions from "@/components/RecentTransactions";
import OverviewChart from "@/components/OverviewChart";
import BudgetProgress from "@/components/BudgetProgress";
import { startOfMonth } from "date-fns";

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

  // Fetch budgets
  const userBudgets = await db.query.budgets.findMany({
    where: eq(budgets.userId, userId),
    orderBy: [desc(budgets.monthYear)],
    with: {
      category: true,
    },
  });

  // Fetch current month expenses for budget tracking
  const currentMonthStart = startOfMonth(new Date());

  // Convert to timestamp for SQLite comparison
  const monthStartTimestamp = Math.floor(currentMonthStart.getTime() / 1000);

  const monthlyExpenses = await db.select({
    categoryId: transactions.categoryId,
    amount: transactions.amount,
    date: transactions.date,
  }).from(transactions).where(
    and(
      eq(transactions.userId, userId),
      eq(transactions.type, "expense"),
      sql`${transactions.date} >= ${monthStartTimestamp}`
    )
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <SummaryCards
        income={totalIncome}
        expense={totalExpense}
        balance={balance}
      />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <OverviewChart data={txs} />
        <BudgetProgress budgets={userBudgets} expenses={monthlyExpenses} />
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}
