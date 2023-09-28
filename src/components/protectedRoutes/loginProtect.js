"use client";
import { useRouter } from "next/navigation";

const LoginProtect = ({ children }) => {
  const router = useRouter();
  if (typeof window !== "undefined" && window.localStorage) {
  

    if (localStorage.getItem("token")) {
      router.push("/");
    } else {
      return children;
    }
  }
};

export default LoginProtect;
