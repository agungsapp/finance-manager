import { auth } from "@/lib/auth";
import { db } from "@/db";
import { transactions, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import ReportsPageClient from "./client";

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = parseInt(session.user.id);

  const txs = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: [desc(transactions.date)],
    with: {
      category: true,
    },
  });

  const cats = await db.select().from(categories).where(eq(categories.userId, userId));

  return <ReportsPageClient transactions={txs} categories={cats} />;
}
