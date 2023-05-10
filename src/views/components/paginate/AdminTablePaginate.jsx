import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../styles/components/paginate.css";
import { Table } from "react-bootstrap";

const AdminTablePaginate = ({ Items, data, itemsPerPage, listClassName }) => {
  // Example items, to simulate fetching from another resources.

  // / Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const paginateButton = (
    <ReactPaginate
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      breakClassName="page-item"
      activeClassName="active"
    />
  );

  return (
    <>
      {paginateButton}
      <div className={listClassName}>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Mata Kuliah</th>
              <th>Kode Mata Kuliah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <Items currentItems={currentItems} index={itemOffset} />
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default AdminTablePaginate;
