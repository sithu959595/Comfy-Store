import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PaginationContainer = () => {
  console.log("pagination");
  const { meta } = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const curPage = searchParams.get("page");
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  if (pageCount < 2) {
    return null;
  }
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prev = page - 1;
            if (prev < 1) {
              prev = pageCount;
            }
            handlePageChange(prev);
          }}
        >
          Pre
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let next = page + 1;
            if (next > pageCount) {
              next = 1;
            }
            handlePageChange(next);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PaginationContainer;
