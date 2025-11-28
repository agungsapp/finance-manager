"use client";

import TransactionTable from "@/components/TransactionTable";
import TransactionForm from "@/components/TransactionForm";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function TransactionPageClient({ transactions, categories }: { transactions: any[], categories: any[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<any>(null);

  const handleEdit = (tx: any) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTx(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </button>
      </div>

      <TransactionTable transactions={transactions} onEdit={handleEdit} />

      {isFormOpen && (
        <TransactionForm
          categories={categories}
          onClose={handleClose}
          initialData={editingTx}
        />
      )}
    </div>
  );
}
