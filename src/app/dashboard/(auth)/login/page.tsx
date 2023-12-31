"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>loading..</p>;
  }

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <form className="flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          required
          className="p-5 bg-transparent border-2 border-gray-700 outline-none rounded text-xl font-bold"
        />
        <input
          type="text"
          placeholder="password"
          required
          className="p-5 bg-transparent border-2 border-gray-700 outline-none rounded text-xl font-bold"
        />
        <button
          type="submit"
          className="p-5 cursor-pointer bg-teal-600 rounded border-none font-bold text-gray-200"
        >
          Login
        </button>
      </form>
      <button
        className="bg-transparent border-2 border-teal-500 hover:border-gray-800 p-4"
        onClick={() => signIn("google")}
      >
        Login with Google
      </button>
      <Link
        className="bg-transparent border-2 border-teal-500 hover:border-gray-800 p-4"
        href="/dashboard/register"
      >
        <button type="button">Singup</button>
      </Link>
    </div>
  );
};

export default Login;
