import { Paginator } from "primereact/paginator";
import React, { useState } from "react";

const Pagination = ({ coins, page, setPage }) => {
  const [first, setFirst] = useState(1);

  const onPageChange = (event) => {
    console.log(event.first);
    setPage(event.first);
  };
  return (
    <>
      <Paginator
        style={{ backgroundColor: "#14161a" }}
        pagi
        first={page}
        rows={10}
        totalRecords={coins.length}
        onPageChange={onPageChange}
        template={{
          layout:
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput",
        }}
      />
    </>
  );
};

export default Pagination;
