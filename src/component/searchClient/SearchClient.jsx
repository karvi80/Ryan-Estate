import React, { Suspense } from "react";
import Search from "../../app/search/page";
import Loader from "../loader/Loader";

const SearchClient = () => {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Search />
    </Suspense>
  )
};

export default SearchClient;
