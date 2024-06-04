import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleUpdateAPI } from "../../Redux/Reducers/CRUD_API.reducers";
import { RotatingLines } from "react-loader-spinner";
const EditProduct = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  const onSubmit = (data) => {
    dispatch(handleUpdateAPI({ ...data, setLoading })).then(() => {
      onClose();
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] m-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="itemName" className="block text-gray-700">
              Product Name
            </label>
            <input
              id="itemName"
              placeholder="Enter Product Name"
              type="text"
              {...register("itemName", {
                required: "Product Name is required",
                minLength: {
                  value: 5,
                  message: "Product Name must be at least 5 characters",
                },
              })}
              className="w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.itemName && (
              <span className="text-red-500">{errors.itemName.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <input
              id="description"
              placeholder="Enter Description"
              type="text"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Title must be at least 20 characters",
                },
              })}
              className="w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              id="price"
              placeholder="Enter price"
              type="text"
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[1-9]\d*(\.\d+)?$/,
                  message: "Price must be a positive number",
                },
              })}
              className="w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <input
              id="category"
              placeholder="Enter Category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="stock" className="block text-gray-700">
              Stock
            </label>
            <input
              id="stock"
              placeholder="Enter Stock"
              type="text"
              {...register("stock", { required: "Stock is required" })}
              className="w-full h-12 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.stock && (
              <span className="text-red-500">{errors.stock.message}</span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-md mr-2"
            >
              {loading ? (
                <div className="px-4 py-2">
                  <RotatingLines
                    visible={true}
                    height="30"
                    width="20"
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-red-500 hover:text-white text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
