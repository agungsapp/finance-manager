"use client";

import { addTransaction, updateTransaction } from "@/app/actions/transactions";
import { useState } from "react";
import { X } from "lucide-react";

export default function TransactionForm({
  categories,
  onClose,
  initialData,
}: {
  categories: any[];
  onClose: () => void;
  initialData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"income" | "expense">(
    initialData?.type || "expense"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    if (initialData) {
      await updateTransaction(initialData.id, formData);
    } else {
      await addTransaction(formData);
    }

    setLoading(false);
    onClose();
  };

  // Filter categories based on selected type
  const filteredCategories = categories.filter((cat) => cat.type === selectedType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <select
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as "income" | "expense")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <input
              name="amount"
              type="number"
              step="0.01"
              defaultValue={initialData?.amount}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="categoryId"
              defaultValue={initialData?.categoryId}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Category</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {filteredCategories.length === 0 && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                No {selectedType} categories available. Please create one first.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              name="date"
              type="date"
              defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
            <textarea
              name="note"
              defaultValue={initialData?.note}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading || filteredCategories.length === 0}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
