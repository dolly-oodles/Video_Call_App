import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {
  CRUD_APISelector,
  handleDeleteAPI,
  handleReadAPI,
} from "../../Redux/Reducers/CRUD_API.reducers";
import EditProduct from "./EditProduct";

const ReadAPI = () => {
  const dispatch = useDispatch();
  const productState = useSelector(CRUD_APISelector) || [];
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(handleReadAPI());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(handleDeleteAPI(id));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleCloseModal = () => {
    setEditProduct(null);
  };

  return (
    <div className="relative overflow-auto h-screen sm:rounded-lg ">
      {editProduct && (
        <EditProduct product={editProduct} onClose={handleCloseModal} />
      )}
      {productState.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 sticky top-0 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productState.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.itemName}
                </th>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="font-medium text-white bg-blue-700 py-1 px-4 rounded-md hover:bg-blue-800 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="font-medium text-white bg-red-600 py-1 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex align-middle justify-center h-screen m-auto p-auto">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default ReadAPI;
