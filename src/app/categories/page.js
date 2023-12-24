"use client";
import DeleteButton from "@/components/DeleteButton";
import { UseProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = UseProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleDelete(_id) {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    toast.promise(deletePromise, {
      loading: "Deleting category...",
      success: "Category deleted",
      error: "Error, sorry...",
    });
    fetchCategories();
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const cresatingPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setNewCategoryName(" ");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(cresatingPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  if (profileLoading) {
    return "Loading user info...";
  }
  if (!profileData.admin) {
    return "You are not admin";
  }
  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">
              {editedCategory ? "Updaate category" : "Create new category"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="Submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setNewCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ul>
        <div>
          <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
          {categories?.length > 0 &&
            categories.map((c) => (
              <div
                className="bg-gray-100 items-center justify-between rounded-xl p-2 px-4 flex gap-1 mb-1"
                key={c._id}
              >
                <span className="grow">{c.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditedCategory(c);
                      setNewCategoryName(c.name);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    onDelete={() => handleDelete(c._id)}
                    label={"Delete"}
                  />
                </div>
              </div>
            ))}
        </div>
      </ul>
    </section>
  );
}
