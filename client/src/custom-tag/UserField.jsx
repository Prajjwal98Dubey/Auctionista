/* eslint-disable react/prop-types */
import { useContext } from "react";
import {
  mapUserFieldDisplayNames,
  mapUserFieldsInput,
} from "../helpers/mapCategoryToOptions";
import UserInfoContext from "../context/userInfoContext";

const UserField = ({ attr, attrVal, editMode }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {mapUserFieldDisplayNames[attr]}
      </label>
      {editMode ? (
        <input
          type={mapUserFieldsInput[attr]}
          name={attr}
          value={attrVal}
          onChange={(e) => {
            handleChange(e);
          }}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 
          text-white focus:ring-2 focus:ring-cyan-500 
          focus:border-cyan-500 transition-all duration-300"
        />
      ) : (
        <p
          className="w-full p-2 h-[40px] rounded-lg bg-gray-800 border border-gray-700 
          text-white focus:ring-2 focus:ring-cyan-500 
          focus:border-cyan-500 transition-all duration-300"
        >
          {attrVal}
        </p>
      )}
    </div>
  );
};

export default UserField;
