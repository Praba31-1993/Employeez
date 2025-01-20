import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogOut = () => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";


    localStorage.removeItem("pin"); // Assuming you stored the sidebar pin state in localStorage
    localStorage.removeItem("token"); // Assuming you stored the sidebar pin state in localStorage

    sessionStorage.clear();

    router.push("/login");
  };
  return (
    <div>
      <div onClick={handleLogOut}>Logout</div>
    </div>
  );
}

export default Logout;
