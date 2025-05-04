import { useNavigate, useParams } from "react-router";
import { useGetProducts } from "./use-fetch-product";
import Web3Service from "../../../services/web3Service";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { ABI_BUY_PRODUCT } from "./ABI-for-buy";
import { contractAddress, systemAddress } from "../config/contract-config";
import { useState } from "react";

export default function ProductDetail() {
  const { productName } = useParams<{ productName: string }>();
  const { products, loading, error, refetch } = useGetProducts();
  const { address } = useSelector((state: RootState) => state.account);

  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    deliveryAddress: "",
    phone: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const product = products.find((p) => p.name === productName);
  const navigate = useNavigate();

  const handleBuy = async () => {
    if (!product || !address) return;

    const web3 = Web3Service.getInstance().getWeb3();
    const contract = new web3.eth.Contract(ABI_BUY_PRODUCT, contractAddress);

    try {
      await contract.methods.buyProduct(product.id).send({
        from: address,
        value: web3.utils.toWei(product.price, "ether"),
      });

      await web3.eth.sendTransaction({
        from: address,
        to: systemAddress,
        value: web3.utils.toWei(product.price, "ether"),
      });

      setShowSuccessModal(true);
      refetch();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleConfirm = () => {
    const { name, deliveryAddress, phone } = buyerInfo;
    if (!name || !deliveryAddress || !phone) {
      alert("❌ Please fill out all required fields.");
      return;
    }
    setShowConfirmModal(true);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading product details...
      </p>
    );

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (!product)
    return (
      <p className="text-center text-gray-500">
        Sorry, we couldn't find that product.
      </p>
    );

  return (
    <div className="mx-auto mt-10 p-4 flex gap-6 bg-white rounded-xl shadow-md">
      <div className="w-full flex flex-col basis-1/2 items-center gap-4">
        <p>
          Sale of <span className="font-bold text-lg">{product.name}</span> for{" "}
          <span className="font-bold text-lg text-green-400">
            {product.price} ETH
          </span>
        </p>

        <p className="text-gray-700 text-center leading-relaxed">
          {product.description}
        </p>
        <img
          src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${product.imageCID}`}
          alt={product.name}
          className="w-full h-full max-w-[500px] object-cover rounded-lg"
        />
        <div className="flex items-center justify-center">
          {product.owner === address ? (
            product.isSold ? (
              <span>Your product was bought by someone</span>
            ) : (
              <span>Your product is in sale</span>
            )
          ) : product.isSold ? (
            <button
              className="px-5 py-2 cursor-pointer hover:bg-blue-500 transition-colors bg-blue-400 uppercase text-white rounded-lg"
              onClick={() => navigate("/products")}
            >
              Go Market
            </button>
          ) : (
            <button
              className="px-5 py-2 cursor-pointer hover:bg-blue-500 transition-colors bg-blue-400 uppercase text-white rounded-lg disabled:cursor-not-allowed disabled:bg-gray-600"
              onClick={() => setIsBuying(true)}
              disabled={isBuying}
            >
              Buy
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 basis-1/2 w-full">
        <h1 className="mx-auto text-3xl font-bold mb-20">Product Details</h1>
        <div className="border-b border-b-gray-200 flex justify-between">
          <span className="uppercase text-lg">Seller</span>
          <span>
            {product.owner === address ? "You are the seller" : product.owner}
          </span>
        </div>
        <div className="border-b border-b-gray-200 flex justify-between">
          <span className="uppercase text-lg">Product Status</span>
          <span>
            {product.isSold
              ? "This item has already been sold"
              : "This product is available"}
          </span>
        </div>
        <div className="border-b border-b-gray-200 flex justify-between">
          <span className="uppercase text-lg">Product Price</span>
          <span>{product.price} ETH</span>
        </div>

        {isBuying && (
          <div className="flex flex-col mt-5 mx-auto w-full max-w-md gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={buyerInfo.name}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, name: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={buyerInfo.deliveryAddress}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, deliveryAddress: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={buyerInfo.phone}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, phone: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
            <p>Name: {buyerInfo.name}</p>
            <p>Address: {buyerInfo.deliveryAddress}</p>
            <p>Phone: {buyerInfo.phone}</p>
            <p>Product: {product.name}</p>
            <img
              src={`${import.meta.env.VITE_IPFS_GATEWAY_URL}${
                product.imageCID
              }`}
              alt={product.name}
              className="max-w-40 max-h-48 mt-6 w-full h-full mx-auto"
            />
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleBuy();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">🎉 Thank You!</h2>
            <p>
              The product you ordered will be delivered to you as soon as
              possible. Please keep your phone ({buyerInfo.phone}) available for
              updates.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                setIsBuying(false);
                setBuyerInfo({ name: "", deliveryAddress: "", phone: "" });
                navigate("/products");
              }}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
