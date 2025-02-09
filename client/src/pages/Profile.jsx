import { useContext, useEffect, useState } from "react";
import {
  DEFAULT_USER_IMAGE,
  MY_PRODUCT_DETAILS_API,
  USER_DETAILS_EDIT_API,
} from "../backendapi";
import UserField from "../custom-tag/UserField";
import { FaCamera } from "react-icons/fa";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { toast } from "react-hot-toast";
import ListedProduct from "../components/ListedProduct";
import UserInfoContext from "../context/userInfoContext";
import BookMark from "../components/BookMark";
const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const handleImageChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
    setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(userData);
    setUserInfo(userInfo);
    setEditMode(false);
    const userImageStorageRef = ref(
      storage,
      `auction/users/${
        userInfo.user_photo.name.split(".")[0] + "-" + Date.now()
      }`
    );
    let downloadedUrl;
    try {
      await uploadBytes(userImageStorageRef, userInfo.user_photo);
      downloadedUrl = await getDownloadURL(userImageStorageRef);
      setUserPhoto(downloadedUrl);
      setUserData((prev) => ({
        ...prev,
        ["user_photo"]: downloadedUrl,
      }));
      setUserInfo((prev) => ({
        ...prev,
        ["user_photo"]: downloadedUrl,
      }));
      // toast.success("User Photo Uploaded....", { duration: 1500 });
      toast.success("user photo uploaded...", { duration: 1500 });
    } catch (error) {
      console.log(error);
    }

    await fetch(USER_DETAILS_EDIT_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...userInfo, ["user_photo"]: downloadedUrl }),
    });
  };

  const getMyProductDetails = async () => {
    let productDetails = await fetch(MY_PRODUCT_DETAILS_API, {
      method: "GET",
      credentials: "include",
    });
    productDetails = await productDetails.json();
    setMyProducts([...productDetails.products]);
    console.log(productDetails.products);
    setIsLoading(false);
    setIsLoadingProducts(false);
  };

  useEffect(() => {
    // const userDetails = async () => {
    //   let details = await fetch(USER_DETAILS_API, {
    //     method: "GET",
    //     credentials: "include",
    //   });
    //   details = await details.json();
    //   setUserData({ ...details });
    //   setUserInfo({ ...details });
    //   setIsLoading(false);
    // };
    // userDetails();
    getMyProductDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 font-inter">
      {!isLoading && (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 border-dotted bg-gradient-to-br from-gray-850 via-gray-800 to-gray-950">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-white">
                  Profile Information
                </h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`px-4 py-2 rounded-lg transition-colors font-bold ${
                    editMode
                      ? "bg-gray-500 hover:bg-gray-600 text-white"
                      : "bg-gradient-to-r from-cyan-700 to-blue-700 text-white hover:bg-gradient-to-r hover:from-cyan-800 hover:to-blue-800"
                  }`}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <img
                      src={
                        userInfo.user_photo === null || !userInfo.user_photo
                          ? DEFAULT_USER_IMAGE
                          : userInfo.user_photo
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-800/50 
               group-hover:border-cyan-500/50 transition-all duration-300"
                    />
                    <div className="absolute -top-0 -right-1 z-10">
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div
                          className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full 
                    transform transition-all duration-300 hover:scale-110
                    shadow-lg hover:shadow-cyan-500/50"
                        >
                          <FaCamera className="w-4 h-4 text-white" />
                        </div>
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        name="user_photo"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(userInfo).map(
                    ([key, value], index) =>
                      key !== "user_photo" && (
                        <div key={index}>
                          <UserField
                            attr={key}
                            attrVal={value}
                            editMode={editMode}
                          />
                        </div>
                      )
                  )}
                </div>
                {editMode && (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold  hover:bg-gradient-to-r hover:from-green-700 hover:to-green-700  py-2 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </div>
            <div className="bg-gradient-to-br from-gray-850 via-gray-800 to-gray-950 p-6 rounded-xl shadow-lg border border-dotted">
              <h2 className="text-2xl font-bold text-white mb-6">
                Listed Products
              </h2>
              {!isLoadingProducts && (
                <div className="grid grid-cols-1 gap-6">
                  {myProducts.map((prod) => (
                    <ListedProduct key={prod.product_id} prod={prod} />
                  ))}

                  {/* {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full   bg-gray-800 border border-gray-700 
          text-white focus:ring-2 focus:ring-purple-500 
          focus:border-purple-500  duration-300 p-4 rounded-xl hover:shadow-md transition-shadow"
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
              ))} */}
                </div>
              )}
            </div>
          </div>
          <div className="text-4xl font-white flex justify-center font-extrabold font-inter w-full">
            <BookMark />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
