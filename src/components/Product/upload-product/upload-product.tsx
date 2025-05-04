import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { useState } from "react";
import { useUploadProduct } from "./use-upload-product";
import { useNavigate } from "react-router";

function UploadProductForm() {
  const { address } = useSelector((state: RootState) => state.account);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const { uploadProduct, loading, cid, error } = useUploadProduct(address);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file) return alert("Select image");

    const result = await uploadProduct(name, description, price, file);
    if (result && result.success) {
      alert("Product uploaded!");
      navigate("/products");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Upload New Product
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Price (ETH)
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.1"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </div>

      {cid && (
        <div className="mt-6 text-center">
          <img
            src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${cid}`}
            alt="Uploaded preview"
            className="mx-auto rounded-lg shadow-md w-40 h-40 object-cover"
          />
          <p className="mt-2 text-sm text-gray-500 break-words">CID: {cid}</p>
        </div>
      )}

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default UploadProductForm;
