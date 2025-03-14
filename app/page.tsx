"use client"; // ✅ Ensures component runs only on client
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Player = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [animationData, setAnimationData] = useState<any>(null); // Store animation data dynamically

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ Ensure safe access to localStorage
      const storedRole = window.localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);


  useEffect(() => {
    // ✅ Import animation JSON dynamically inside useEffect
    import("@/public/assets/EZ animation.json")
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("Failed to load animation", err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./login"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!animationData) return null; // Avoid rendering until data is loaded

  return (
    <div
      className="animation-container h-100 w-100 d-flex justify-content-center align-items-center"
      style={{ position: "absolute", top: "0px", left: "0px" }}
    >
      <Player
        autoplay
        loop={false} // Stops animation after one cycle
        animationData={animationData} // ✅ Now safely loaded
        style={{ height: "50%", width: "50%" }}
      />
    </div>
  );
}
