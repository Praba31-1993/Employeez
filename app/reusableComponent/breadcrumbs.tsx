"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link"; // Use Next.js Link
import { usePathname } from "next/navigation";
import { Colors } from "./styles";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function BreadcrumbsComponent({ selectedTab }: any) {
  const [urldata, setUrlData] = useState<any[]>([]);
  const pathname = usePathname();
  const useColors = Colors();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

    if (selectedTab) {
      result.push({
        label: capitalizeFirstLetter(selectedTab),
        path: "",
      });
    }

    setUrlData(result);
  };

  useEffect(() => {
    handleUrltoBreadcrumbs();
  }, [pathname, selectedTab]);

  return (
    <div role="presentation" className="my-1 row" onClick={handleClick}>
      <div className="col-12 ">
      <Breadcrumbs
        separator={
          <span className="m-0 shade" >
            {"›"}
          </span>
        }
        aria-label="breadcrumb"
      >
        {urldata.map((url, index) => (
          <Link key={index} className="para2 shade" href={url.path}>
            {url.label}
          </Link>
        ))}
      </Breadcrumbs>
      </div>
    </div>
  );
}
