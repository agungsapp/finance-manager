"use server";

import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addBudget(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const userId = parseInt(session.user.id);
  const categoryId = parseInt(formData.get("categoryId") as string);
  const amount = parseFloat(formData.get("amount") as string);
  const monthYear = formData.get("monthYear") as string;

  if (isNaN(categoryId) || isNaN(amount) || !monthYear) {
    return { error: "Invalid input" };
  }

  await db.insert(budgets).values({
    userId,
    categoryId,
    amount,
    monthYear,
  });

  revalidatePath("/budgets");
  return { success: true };
}

export async function deleteBudget(id: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await db.delete(budgets).where(eq(budgets.id, id));

  revalidatePath("/budgets");
  return { success: true };
}

export async function updateBudget(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const categoryId = parseInt(formData.get("categoryId") as string);
  const amount = parseFloat(formData.get("amount") as string);
  const monthYear = formData.get("monthYear") as string;

  if (isNaN(categoryId) || isNaN(amount) || !monthYear) {
    return { error: "Invalid input" };
  }

  await db.update(budgets)
    .set({
      categoryId,
      amount,
      monthYear,
    })
    .where(eq(budgets.id, id));

  revalidatePath("/budgets");
  return { success: true };
}
