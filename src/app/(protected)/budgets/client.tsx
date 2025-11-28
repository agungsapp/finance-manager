"use client";

import BudgetForm from "@/components/BudgetForm";
import { deleteBudget } from "@/app/actions/budgets";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function BudgetsPageClient({ budgets, categories }: { budgets: any[], categories: any[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      setDeletingId(id);
      await deleteBudget(id);
      setDeletingId(null);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingBudget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budgets</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <div key={budget.id} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900 dark:text-white">{budget.category?.name}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(budget)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(budget.id)}
                  disabled={deletingId === budget.id}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{budget.monthYear}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">${budget.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <BudgetForm
          categories={categories}
          onClose={handleClose}
          initialData={editingBudget}
        />
      )}
    </div>
  );
}
