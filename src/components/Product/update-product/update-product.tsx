import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useUpdateProduct } from "./use-update-product";
import { RootState } from "../../../features/store";
import { useSelector } from "react-redux";
import { useGetProducts } from "../get-product/use-fetch-product";

export default function UpdateProduct() {
  const { productName } = useParams();
  const { address } = useSelector((state: RootState) => state.account);
  const { products } = useGetProducts();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const product = products.find(
    (p) =>
      p.name.toLowerCase().trim() === productName?.toLocaleLowerCase().trim()
  );

  const { updateProduct, loading, cid, error } = useUpdateProduct(address);

  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!product) return;

    const updatedName = name || product.name;
    const updatedDescription = description || product.description;
    const updatedPrice = price || product.price;

    await updateProduct(
      product.id,
      updatedName,
      updatedDescription,
      updatedPrice,
      product.imageCID,
      file ?? undefined
    );

    setIsSuccessModalOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Update Product
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full border px-4 py-2 rounded-md"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full border px-4 py-2 rounded-md"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price in ETH"
          className="w-full border px-4 py-2 rounded-md"
        />
        <p className="text-lg text-gray-600">Current Image:</p>
        <img
          src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${product?.imageCID}`}
          alt={product?.name}
          className="w-full h-full object-cover rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border cursor-pointer px-4 py-2 rounded-lg"
        />

        {error && <p className="text-red-500">{error}</p>}
        {cid && <p className="text-green-500">New CID: {cid}</p>}

        <button
          disabled={loading}
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-600 transition-colors w-full"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
              <h3 className="text-2xl font-bold mb-2 text-green-600">
                Update Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Click below to view the updated product.
              </p>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  navigate('/products');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Go to Product Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
