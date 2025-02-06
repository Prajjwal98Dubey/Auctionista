import { useEffect, useState } from "react";
import { USER_DETAILS_API, USER_DETAILS_EDIT_API } from "../backendapi";
import UserField from "../custom-tag/UserField";

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [products] = useState([
    {
      id: 1,
      name: "Vintage Camera",
      price: 299.99,
      description: "Classic film camera from 1980s",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: 159.99,
      description: "Premium quality genuine leather",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  ]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(userData);
    setEditMode(false);
    await fetch(USER_DETAILS_EDIT_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
  };

  useEffect(() => {
    const userDetails = async () => {
      let details = await fetch(USER_DETAILS_API, {
        method: "GET",
        credentials: "include",
      });
      details = await details.json();
      setUserData({ ...details });
      setIsLoading(false);
    };
    userDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 p-6 font-inter">
      {!isLoading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  editMode
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
                />
                {editMode && (
                  <input
                    type="url"
                    name="photo"
                    value={userData.photo}
                    onChange={handleChange}
                    placeholder="Photo URL"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>

              <div className="space-y-4">
                {Object.entries(userData).map(
                  ([key, value], index) =>
                    key !== "user_photo" && (
                      <div key={index}>
                        <UserField
                          attr={key}
                          attrVal={value}
                          editMode={editMode}
                          userData={userData}
                          setUserData={setUserData}
                        />
                      </div>
                    )
                )}
              </div>
              {editMode && (
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Listed Products
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-green-600 font-bold text-lg mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
