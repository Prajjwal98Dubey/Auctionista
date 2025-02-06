/* eslint-disable react/prop-types */
import {
  mapUserFieldDisplayNames,
  mapUserFieldsInput,
} from "../helpers/mapCategoryToOptions";

const UserField = ({ attr, attrVal, editMode, userData, setUserData }) => {
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <p className="p-2 bg-gray-50 rounded-lg h-[35px] ">{attrVal}</p>
      )}
    </div>
  );
};

export default UserField;
