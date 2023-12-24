"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.ok) {
        setUserCreated(true);
    }
    else {
        setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="my-8">
      <h1 className="text-center text-red-600 text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Error. <br /> Please try again later.
        </div>
      )}
      <form
        className="block max-w-xs mx-auto"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div
          className="my-4 text-center text-gray-500
                "
        >
          or login with google
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt="" width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
            Existing account? 
            <Link className="underline" href={"/login"}>Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}
