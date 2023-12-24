"use client";
import { UseProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForms";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resolve } from "styled-jsx/css";

export default function EditUserPage() {
  const [user, setUser] = useState(null);
  const { loading, data } = UseProfile();
  const { id } = useParams();

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if(resp.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving this user",
      success: "User Saved!",
      error: "Failed to save!",
    });
  }

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((i) => i._id === id);
        setUser(user);
      });
    });
  }, [id]);

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-xl">
      <UserTabs isAdmin={true} />
      <UserForm user={user} handleChange={handleSaveButtonClick} />
    </section>
  );
}
