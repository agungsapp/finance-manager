"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const userId = parseInt(session.user.id);
  const name = formData.get("name") as string;
  const type = formData.get("type") as "income" | "expense";

  if (!name || !type) {
    return { error: "Invalid input" };
  }

  await db.insert(categories).values({
    userId,
    name,
    type,
  });

  revalidatePath("/categories");
  revalidatePath("/transactions");
  return { success: true };
}

export async function deleteCategory(id: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/categories");
  revalidatePath("/transactions");
  return { success: true };
}

export async function updateCategory(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const type = formData.get("type") as "income" | "expense";

  if (!name || !type) {
    return { error: "Invalid input" };
  }

  await db.update(categories)
    .set({
      name,
      type,
    })
    .where(eq(categories.id, id));

  revalidatePath("/categories");
  revalidatePath("/transactions");
  return { success: true };
}
