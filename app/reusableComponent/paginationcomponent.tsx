import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./stylessheetforreusablecomponent.css";
interface PaginationProps {
  data: any;
  itemsPerPage: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

function PaginationComponent({
  data,
  itemsPerPage,
  currentPage,
  goToPage,
}: PaginationProps) {
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const gotoFirstPage = () => {
    goToPage(1);
  };

  const gotoLastPage = () => {
    goToPage(totalPages);
  };

  console.log("data", data.length);

  return (
    <div className="d-flex justify-content-between gap-2 align-items-center cursorpointer">
      <ArrowBackIosIcon
        onClick={gotoFirstPage}
        sx={{ fontSize: "15px", cursor: "pointer" }}
      />
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Prev
      </button>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber + 1)}
          style={{
            backgroundColor: currentPage === pageNumber + 1 ? "red" : "",
            color: currentPage === pageNumber + 1 ? "white" : "black",
            borderRadius: "50px",
            height: "30px",
            width: "30px",
          }}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <ArrowForwardIosIcon
        onClick={gotoLastPage}
        sx={{ fontSize: "15px", cursor: "pointer" }}
      />
    </div>
  );
}

export default PaginationComponent;
