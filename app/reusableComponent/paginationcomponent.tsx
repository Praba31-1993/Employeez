import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Colors } from "./styles";

interface PaginationProps {
  currentPage: number;
  currentPageFunction: (page: number) => void;
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  currentPageFunction,
  totalPages,
}) => {
  const useColors = Colors(); // Assuming useColors.themeRed is accessible

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      // Show all pages if total pages are 6 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (currentPage <= 3) {
        pages.push(2, 3, 4, "...", totalPages);
      } else if (currentPage === 4) {
        pages.push("...", 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div>
      <div className="d-flex align-items-center mt-2 justify-content-end">
        <div
          className="page-item text-center"
          style={{ cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
          onClick={() => currentPage > 1 && currentPageFunction(currentPage - 1)}
        >
          <ArrowBackIosIcon />
        </div>

        {pages.map((page, index) => (
          <div
            key={index}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            style={{
              cursor: page === "..." ? "default" : "pointer",
              backgroundColor: currentPage === page ? useColors.themeRed : "transparent",
              color: currentPage === page ? "#fff" : "inherit",
              borderRadius: "50%",
              padding: typeof page === "number" && page > 9 ? "7px 8px" : "5px 10px", // Single vs double-digit padding
            }}
            onClick={() => typeof page === "number" && currentPageFunction(page)}
          >
            {page}
          </div>
        ))}


        <div
          className="page-item"
          style={{ cursor: "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
          onClick={() => currentPage < totalPages && currentPageFunction(currentPage + 1)}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
