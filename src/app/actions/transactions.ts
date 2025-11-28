"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const userId = parseInt(session.user.id);
  const amount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as "income" | "expense";
  const categoryId = parseInt(formData.get("categoryId") as string);
  const note = formData.get("note") as string;
  const date = new Date(formData.get("date") as string);

  if (isNaN(amount) || !type || isNaN(categoryId) || !date) {
    return { error: "Invalid input" };
  }

  await db.insert(transactions).values({
    userId,
    amount,
    type,
    categoryId,
    note,
    date,
  });

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteTransaction(id: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await db.delete(transactions).where(eq(transactions.id, id));

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTransaction(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const amount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as "income" | "expense";
  const categoryId = parseInt(formData.get("categoryId") as string);
  const note = formData.get("note") as string;
  const date = new Date(formData.get("date") as string);

  if (isNaN(amount) || !type || isNaN(categoryId) || !date) {
    return { error: "Invalid input" };
  }

  await db.update(transactions)
    .set({
      amount,
      type,
      categoryId,
      note,
      date,
    })
    .where(eq(transactions.id, id));

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  return { success: true };
}
