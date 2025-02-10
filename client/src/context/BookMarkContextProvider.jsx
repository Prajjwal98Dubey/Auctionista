/* eslint-disable react/prop-types */
import { useState } from "react";
import { BookMarkContext } from "./BookMarkContext";

function BookMarkContextProvider({ children }) {
  const [bookMarkInfo, setBookMarkInfo] = useState([]);
  return (
    <BookMarkContext.Provider value={{ bookMarkInfo, setBookMarkInfo }}>
      {children}
    </BookMarkContext.Provider>
  );
}

export default BookMarkContextProvider;
