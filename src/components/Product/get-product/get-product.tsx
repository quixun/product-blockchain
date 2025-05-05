import { useNavigate } from "react-router";
import { useGetProducts } from "./use-fetch-product";
import { useState } from "react";

export default function GetProduct() {
  const { products, loading, error } = useGetProducts();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col py-30 px-10 items-center">
      <div className="w-full flex justify-center mb-6">
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search a product"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="border border-blue-300 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-5 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white p-4 rounded-xl shadow-md space-y-2"
            >
              {product.isSold && (
                <span className="absolute top-2 right-2 z-50 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  SOLD OUT
                </span>
              )}

              <div className="relative w-full pb-[56.25%]">
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
                  product.isSold ? "line-through" : ""
                }`}
              >
                {product.price} ETH
              </p>
              <button
                onClick={() => navigate(`/product-detail/${product.name}`)}
                className="px-3 py-2 bg-blue-400 cursor-pointer hover:bg-blue-500 transition mx-auto text-white rounded-lg w-full"
              >
                See More
              </button>
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
