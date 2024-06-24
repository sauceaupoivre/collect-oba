import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Paginate({ total, initialPage, perPage, updatePage }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(total);

  useEffect(() => {
    setTotalPages(Math.ceil(total / perPage));
  }, [total, perPage]);

  const changePage = (page) => {
    setCurrentPage(page);
    updatePage(page);
  };

  return (
    <Pagination
      total={totalPages}
      initialPage={currentPage}
      onChange={(page) => changePage(page)}
    />
  );
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  initialPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
};
