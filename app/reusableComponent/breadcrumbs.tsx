"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link"; // Use Next.js Link
import { usePathname } from "next/navigation";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function BreadcrumbsComponent({ selectedTab }: any) {
  const [urldata, setUrlData] = useState<any[]>([]);
  const pathname = usePathname();

  // Capitalize the first letter of each breadcrumb segment
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to handle URL path and generate breadcrumb links
  const handleUrltoBreadcrumbs = () => {
    const data = pathname;
    const result = data
      .split("/")
      .filter(Boolean)
      .map((item, index, array) => {
        return {
          label: capitalizeFirstLetter(item),
          path: `/${array.slice(0, index + 1).join("/")}`,
        };
      });

    // Append the selectedTab as the last breadcrumb item
    if (selectedTab) {
      result.push({
        label: capitalizeFirstLetter(selectedTab),
        path: "", // No path for the last breadcrumb, since it's just a label
      });
    }

    console.log("Breadcrumbs data:", result);
    setUrlData(result);
  };

  useEffect(() => {
    handleUrltoBreadcrumbs();
  }, [pathname, selectedTab]); // Trigger effect on pathname or selectedTab change

  return (
    <div role="presentation" className="my-1" onClick={handleClick}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {urldata.map((url, index) => (
          <Link
            key={index}
            className="para2"
            href={url.path} // Use the dynamically generated path
          >
            {url.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
