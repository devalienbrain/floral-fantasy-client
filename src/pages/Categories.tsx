import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/api";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

interface CategoryCardProps {
  _id: string;
  name: string;
  totalProducts: number;
}

const Categories = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] =
    useState<CategoryCardProps | null>(null);

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery(null);

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategoryName }).unwrap();
      setNewCategoryName("");
      document.getElementById("my_modal_5").close();
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Failed to add category", error);
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = (category: CategoryCardProps) => {
    setEditingCategory(category);
    document.getElementById("edit_modal").showModal();
  };

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      try {
        const { _id, ...updateData } = editingCategory; // Exclude _id from update data
        await updateCategory({
          id: _id,
          data: updateData,
        }).unwrap();
        setEditingCategory(null);
        document.getElementById("edit_modal").close();
        toast.success("Category updated successfully!");
      } catch (error) {
        console.error("Failed to update category", error);
        toast.error("Failed to update category");
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Floral Fantasy | Categories</title>
      </Helmet>
      <div className=" max-w-7xl mx-auto p-10">
        <h1 className="text-center py-10 text-6xl font-black">
          <span className="text-red-500 font-black">Categories</span> Management
        </h1>
        <div className="mx-auto flex justify-center text-white pb-10">
          <div className="lg:tooltip" data-tip="Click to add a new category">
            <button
              className="w-20 h-20 rounded-full text-3xl font-black text-lime-600 border"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              +
            </button>
          </div>
        </div>

        {/* Add Category Modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a new category</h3>
            <div className="py-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={handleAddCategory}
                disabled={isAddingCategory}
              >
                {isAddingCategory ? "Adding..." : "Add"}
              </button>
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="font-bold text-base text-lime-900">
                <th>SI</th>
                <th className="text-left">Category Name</th>
                <th className="text-left">Total Products</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isCategoriesLoading ? (
                <tr>
                  <td colSpan={4} className="text-center text-green-500">
                    Loading...
                  </td>
                </tr>
              ) : isCategoriesError ? (
                <tr>
                  <td colSpan={4} className="text-center text-red-500">
                    Oops! Error loading categories
                  </td>
                </tr>
              ) : (
                categoriesData?.data?.map(
                  (category: CategoryCardProps, index: number) => (
                    <tr key={category._id} className="border-b border-lime-300">
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.totalProducts}</td>
                      <td className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-outline btn-warning"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Category Modal */}
        <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit category</h3>
            {editingCategory && (
              <div className="py-4">
                <label>Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="Category name"
                  className="input input-bordered w-full"
                />
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn"
                onClick={handleUpdateCategory}
                disabled={isUpdatingCategory}
              >
                {isUpdatingCategory ? "Updating..." : "Update"}
              </button>
              <button
                className="btn"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Categories;
