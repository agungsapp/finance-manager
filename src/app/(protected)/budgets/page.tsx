import { auth } from "@/lib/auth";
import { db } from "@/db";
import { budgets, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import BudgetsPageClient from "./client";

export default async function BudgetsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = parseInt(session.user.id);

  const userBudgets = await db.query.budgets.findMany({
    where: eq(budgets.userId, userId),
    orderBy: [desc(budgets.monthYear)],
    with: {
      category: true,
    },
  });

  const userCategories = await db.select().from(categories).where(eq(categories.userId, userId));

  return <BudgetsPageClient budgets={userBudgets} categories={userCategories} />;
}
