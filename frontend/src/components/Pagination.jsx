const Pagination = ({
  totalProducts,
  productPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pages.push(i);
  }
  return (
    <ul className="pagination justify-content-center p-3">
      {pages.map((page, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button
            className="page-link border border-dark"
            onClick={() => setCurrentPage(page)}
            style={{ cursor: "pointer" }}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
