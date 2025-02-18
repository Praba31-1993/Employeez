import React from "react";
import { Colors } from "./styles";

interface PaginationProps {
    currentPage: number;
    currentPageFunction: (page: number) => void;
    totalPages: number;
    itemsPerPage: number;
    setItemsPerPage: (size: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
    currentPage,
    currentPageFunction,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
}) => {
    const generatePages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1); // Always show the first page

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
    const useColors = Colors();

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", marginTop: "10px" }}>
                {/* Page Size Selector */}
                <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    style={{ marginRight: "10px", padding: "5px" }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>

                {/* Previous Button */}
                <button
                    onClick={() => currentPage > 1 && currentPageFunction(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={buttonStyle}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === "number" && currentPageFunction(page)}
                        disabled={page === "..."}
                        style={{
                            ...buttonStyle,
                            backgroundColor: currentPage === page ? useColors.themeRed : "transparent",
                            color: currentPage === page ? "#fff" : "black",
                            fontWeight: currentPage === page ? "bold" : "normal",
                        }}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => currentPage < totalPages && currentPageFunction(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={buttonStyle}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    cursor: "pointer",
    margin: "0 5px",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "white",
};

export default PaginationComponent;
