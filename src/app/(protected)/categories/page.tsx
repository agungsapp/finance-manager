import { auth } from "@/lib/auth";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CategoriesPageClient from "./client";

export default async function CategoriesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = parseInt(session.user.id);

  const cats = await db.select().from(categories).where(eq(categories.userId, userId));

  return <CategoriesPageClient categories={cats} />;
}
