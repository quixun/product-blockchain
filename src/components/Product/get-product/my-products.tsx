import { useSelector } from "react-redux";
import { useGetProducts } from "./use-fetch-product";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../../../features/store";

export default function MyProducts() {
  const { address } = useSelector((state: RootState) => state.account);
  const { products, loading, error } = useGetProducts();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if (loading)
    return <p className="text-center mt-10">Loading your products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredProducts = products.filter(
    (product) =>
      product.owner === address &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col py-30 px-10 items-center">
      {/* 🔍 Centered Search Bar */}
      <div className="w-full flex justify-center mb-6">
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search your products"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="border border-blue-300 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50">
            Search
          </button>
        </div>
      </div>

      {/* 🛒 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-5 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative cursor-pointer bg-white p-4 rounded-xl shadow-md space-y-2"
              onClick={() => navigate(`/product-detail/${product.name}`)}
            >
              {product.isSold && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/70 bg-opacity-60 flex items-center justify-center text-white font-bold text-xl rounded-xl z-10 cursor-not-allowed">
                  SOLD OUT
                </div>
              )}

              <div className="relative w-full h-0 pb-[56.25%]">
                <img
                  src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${
                    product.imageCID
                  }`}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-lg mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p
                className={`text-blue-600 font-bold ${
                  product.isSold && "line-through"
                }`}
              >
                {product.price} ETH
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
