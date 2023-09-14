// Home.tsx
import { LoginTexts } from "@/HebrewStrings/Texts";
import { Metadata } from "next";
import { loginStyles } from "../utils/styles";
import Login from "./_components/Login";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LoginPage() {
  return (
    <main className="container mx-auto mt-5 text-center">
      <h1 className={loginStyles.our_title}>{LoginTexts.welcome}</h1>
      <h2 className={loginStyles.our_title}>IDF Academy</h2>
      <Login />
      <button className={`${loginStyles.button} ${loginStyles.buttonRegister}`}>
        {LoginTexts.register}
      </button>
    </main>
  );
}
