import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogOut = () => {
    // Delete the 'token' cookie by setting its expiration date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    
    // Redirect to the login page
    router.push("/login");
  };
  
  return (
    <div>
      <div onClick={handleLogOut}>Logout</div>
    </div>
  );
}

export default Logout;
