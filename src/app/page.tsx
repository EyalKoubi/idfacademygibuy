// Home.tsx
import { LoginTexts } from "@/HebrewStrings/Texts";
import { Metadata } from "next";
import { loginStyles } from "../utils/styles";
import Login from "./_components/Login";
import useUserStore from "./_contexts/userContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LoginPage() {
  const {user}=useUserStore();
  return (

    <main className="container mx-auto mt-5 text-center">
      <h1 className={loginStyles.our_title}>{`${LoginTexts.welcome} ${user.name} `}</h1>
      <h2 className={loginStyles.our_title}>IDF Academy</h2>
      <Login />
      <button className={`${loginStyles.button} ${loginStyles.buttonRegister}`}>
        {LoginTexts.register}
      </button>
    </main>
  );
}

{/** */}