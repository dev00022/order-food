"use client";
import DeleteButton from "@/components/DeleteButton";
import { UseProfile } from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = UseProfile();
  useEffect(() => {
    fetch("/api/menu-items?_id="+id).then(res => {
      res.json().then((items) => {
        const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
    })
  },[id]);

  async function handleDelete() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting this item",
      success: "Item Deleted!",
      error: "Failed to delete!",
    });
    setRedirectToItems(true);
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromeise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromeise, {
      loading: "Saving this item",
      success: "Item Saved!",
      error: "Failed to save!",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link className="button" href={"/menu-items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-lg mx-auto mt-4 flex justify-center">
        <DeleteButton label={'Delete this menu item'} onDelete={handleDelete}/>
      </div>
    </section>
  );
}
