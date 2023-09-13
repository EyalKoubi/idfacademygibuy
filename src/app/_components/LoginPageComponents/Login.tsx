"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoginTexts } from "@/HebrewStrings/Texts";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const handleButtonClick = async () => {
    if (sessionData?.user) {
      await signOut();
      console.log("I am here (if branch)");
    } else {
      await signIn();
      router.replace("/home/editor");
      console.log("I am here (else branch)");
    }
  };

  return (
    <Link href="/home/editor">
      <button onClick={handleButtonClick} className="">
        {sessionData?.user ? "Logout" : LoginTexts.login}
      </button>
    </Link>
  );
};

export default Login;
