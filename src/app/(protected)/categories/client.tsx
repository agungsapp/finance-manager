"use client";

import CategoryForm from "@/components/CategoryForm";
import { deleteCategory } from "@/app/actions/categories";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function CategoriesPageClient({ categories }: { categories: any[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (cat: any) => {
    setEditingCat(cat);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setDeletingId(id);
      await deleteCategory(id);
      setDeletingId(null);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingCat(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
              <p className={`text-sm ${cat.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {cat.type.charAt(0).toUpperCase() + cat.type.slice(1)}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                disabled={deletingId === cat.id}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <CategoryForm
          onClose={handleClose}
          initialData={editingCat}
        />
      )}
    </div>
  );
}
