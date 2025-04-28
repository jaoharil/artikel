'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [search, currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories', {
        params: { page: currentPage, search },
      });
      setCategories(res.data.data);
      setTotalPages(res.data.meta?.last_page || 1);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Category name cannot be empty!');
      return;
    }

    try {
      if (selectedCategoryId) {
        // Update category
        await api.put(`/categories/${selectedCategoryId}`, { name: newCategoryName });
      } else {
        // Create category
        await api.post('/categories', { name: newCategoryName });
      }
      setShowAddEditModal(false);
      setNewCategoryName('');
      setSelectedCategoryId(null);
      fetchCategories();
    } catch (err: any) {
      console.error('Error saving category:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) return;
    try {
      await api.delete(`/categories/${selectedCategoryId}`);
      setShowDeleteModal(false);
      setSelectedCategoryId(null);
      fetchCategories();
    } catch (err: any) {
      console.error('Error deleting category:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 relative">
        {/* Header */}
        <AdminHeader title="Category" />

        {/* Filter dan Add Button */}
        <p className="mb-4">Total Category: {categories.length}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <input type="text" placeholder="Search Category" value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded border" />
          </div>
          <button
            onClick={() => {
              setShowAddEditModal(true);
              setSelectedCategoryId(null);
              setNewCategoryName('');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add New Category
          </button>
        </div>

        {/* Table Categories */}
        <div className="bg-white shadow rounded">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Created at</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="p-3">{category.name}</td>
                  <td className="p-3">{new Date(category.createdAt).toLocaleString()}</td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => {
                        setShowAddEditModal(true);
                        setSelectedCategoryId(category.id);
                        setNewCategoryName(category.name);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedCategoryId(category.id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">
              Previous
            </button>
            <span>{currentPage}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </div>

        {/* Modal Add / Edit Category */}
        {showAddEditModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">{selectedCategoryId ? 'Edit Category' : 'Add New Category'}</h2>
              <input type="text" placeholder="Category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded text-gray-700" />
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowAddEditModal(false);
                    setNewCategoryName('');
                    setSelectedCategoryId(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button onClick={handleSaveCategory} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirm Delete */}
        {showDeleteModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Category</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this category? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategoryId(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button onClick={handleDeleteCategory} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
