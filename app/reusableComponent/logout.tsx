import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <div onClick={handleLogOut}>Logout</div>
    </div>
  );
}

export default Logout;
