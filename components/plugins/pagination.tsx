import ReactPaginate from "react-paginate";

const Pagination = ({ handleClick, currentPage = 0, totalPages = 0 }) => {
  const handlePageChange = (value) => {
    if (document) {
      const scrollNode = document.querySelector("#paginationAnchor");
      scrollNode.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }

    handleClick(value);
  };

  return (
    <>
      <div className="pagination-block custom-pagination">
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={"active"}
          previousLinkClassName={"arrow back-arrow icon-font-pagination-arrow"}
          nextLinkClassName={"arrow right-arrow icon-font-pagination-arrow"}
          disabledClassName={"disabled"}
          initialPage={currentPage - 1} // current page - 1
          pageCount={totalPages} // total number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Pagination;
