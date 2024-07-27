import { useState } from "react";
import { useGetCategoriesQuery, useAddCategoryMutation } from "@/redux/api/api";
import { Helmet } from "react-helmet-async";

interface CategoryCardProps {
  name: string;
}

const Categories = () => {
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery(null);

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategoryName }).unwrap();
      setNewCategoryName("");
      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Categories</title>
      </Helmet>
      <div className="p-10">
        {/* Category Container */}
        <div>
          <h1 className="text-center py-10 text-6xl font-bold">Categories</h1>
          <div className="mx-auto flex justify-center text-white pb-10 ">
            <div className="lg:tooltip" data-tip="Click to add a new category">
              <button
                className="w-20 h-20 rounded-full text-3xl font-black text-black border"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                +
              </button>
            </div>
            {/* Open the modal using document.getElementById('my_modal_5').showModal() method */}
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
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
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          </div>

          {/* Add a category modal*/}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {categories?.data?.map((category: CategoryCardProps, index) => (
              <div
                key={index}
                className="bg-black/5 shadow-md px-10 rounded-xl"
              >
                <div className="p-4">
                  <p className="text-lime-950 text-xl font-bold">
                    {category.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
