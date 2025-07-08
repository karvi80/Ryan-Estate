import React, { Suspense } from "react";
import Search from "./Search";
import Loader from "../../component/loader/Loader";

const SearchClient = () => {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Search />
    </Suspense>
  )
};

export default SearchClient;