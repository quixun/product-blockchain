import React from "react";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  owner: string;
  name: string;
  description: string;
  imageCID: string;
  price: string;
  isSold: boolean;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  const navigate = useNavigate();
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ×
        </button>
        <img
          src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${product.imageCID}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>
          <span className="font-medium">Owner:</span> {product.owner}
        </p>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p>
          <span className="font-medium">Price:</span> {product.price} ETH
        </p>
        {product.isSold ? (
          <p className="text-red-500 font-semibold">
            This product is already sold
          </p>
        ) : (
          <button
            onClick={() => navigate(`/product-detail/${product.name}`)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            see more
          </button>
        )}
      </div>
    </div>
  );
};
