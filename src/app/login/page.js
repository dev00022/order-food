"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logininProgress, setLogininProgress] = useState(false);

  function rewriteCredentail(){
    setEmail('Admin@exgmail.com');
    setPassword('adminpas12345');
  }

  async function handleSubmit(ev){
    ev.preventDefault();
    setLogininProgress(true);
    await signIn('credentials',{email, password, callbackUrl: '/'});
    setLogininProgress(false);
  }
  return (
    <section className="my-4">
      <h1 className="text-center text-red-600 text-4xl py-4">Login</h1>
      <form
        className="block max-w-xs mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={logininProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={logininProgress}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"
         disabled={logininProgress}
         >
          Login
        </button>
        <div
          className="my-4 text-center text-gray-500
                "
        >
          or login with google
        </div>
        <button className="flex gap-4 justify-center" onClick={rewriteCredentail}>
          <Image src={"/admin.png"} alt="" width={24} height={24} />
          Set admin Credentials
        </button>
        {/* <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div> */}
      </form>
    </section>
  );
}
