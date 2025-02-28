/* eslint-disable react/prop-types */
import { useState } from "react";
import UserInfoContext from "./userInfoContext";

function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContextProvider;
