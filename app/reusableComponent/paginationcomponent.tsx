import React from 'react';

interface PaginationProps {
  currentPage: number;
  currentPageFunction: (page: number) => void;
  pages: (number | string)[]; 
  totalPages: number;
}

const Paginationcomponent: React.FC<PaginationProps> = ({
  currentPage,
  currentPageFunction,
  pages,
  totalPages,
}) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 justify-content-end">
        <div
          className="page-item"
          style={{ cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
          onClick={() => currentPage > 1 && currentPageFunction(currentPage - 1)}
        >
          Prev
        </div>
        {pages.map((page, index) => (
          <div
            key={index}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => typeof page === 'number' && currentPageFunction(page)}
          >
            {page}
          </div>
        ))}
        <div
          className="page-item"
          style={{ cursor: 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
          onClick={() => currentPage < totalPages && currentPageFunction(currentPage + 1)}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Paginationcomponent;
