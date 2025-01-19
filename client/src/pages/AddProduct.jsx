import { useContext, useState } from "react";
import { mapCategoriesToOptions } from "../helpers/mapCategoryToOptions";
import InputCustom from "../custom-tag/InputCustom";
import ProductContext from "../context/ProductContext";
import { callAddProducts } from "../helpers/callAddProduct";
// import { callAddProducts } from "../helpers/callAddProduct";

const AddProduct = () => {
  const [selected, setSelected] = useState("");
  const { productDetails } = useContext(ProductContext);
  const handleAddProduct = async () => {
    await callAddProducts(selected, productDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Fill in the details to list your product for auction
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <select
              defaultValue="no-select"
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="no-select" disabled>
                Choose a Category
              </option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="watch">Watch</option>
              <option value="monitor">Monitor</option>
              <option value="keyboard">KeyBoard</option>
              <option value="mouse">Mouse</option>
              <option value="headphone">Headphone</option>
              <option value="electronics">General Electronics</option>
            </select>
          </div>

          {/* Dynamic Form Fields */}
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ...mapCategoriesToOptions["common"],
                ...mapCategoriesToOptions[selected],
              ].map((feature, index) => (
                <div key={index} className="relative">
                  <InputCustom feature={feature} />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          {selected && (
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 transform hover:scale-[1.02]"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Need help? Contact our support team
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
