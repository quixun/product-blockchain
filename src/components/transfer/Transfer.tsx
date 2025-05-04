import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import Web3Service from "../../services/web3Service";
import { useAppDispatch } from "../../features/hooks";
import { updateAcount } from "../../features/account/accountSlice";

const Transfer: React.FC = () => {
  const { address } = useSelector((state: RootState) => state.account);
  const dispatch = useAppDispatch();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const web3 = Web3Service.getInstance().getWeb3();

  const handleTransfer = async () => {
    try {
      if (!address) {
        setMessage("Bạn chưa đăng nhập.");
        return;
      }

      if (!web3.utils.toChecksumAddress(recipient)) {
        setMessage("Địa chỉ ví không hợp lệ.");
        return;
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        setMessage("Số tiền không hợp lệ.");
        return;
      }

      setLoading(true);
      setMessage("");

      await web3.eth.sendTransaction({
        from: address,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
      });

      const balance = await web3.eth.getBalance(address);
      const nonce = await web3.eth.getTransactionCount(address);

      dispatch(
        updateAcount({
          balance: web3.utils.fromWei(balance, "ether"),
          nonce: nonce.toString(),
        })
      );

      setMessage("Chuyển tiền thành công!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      setMessage("Giao dịch thất bại.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Chuyển tiền</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <div className="mb-4">
        <label className="block font-medium">Địa chỉ ví nhận:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Số tiền (ETH):</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>
      <button
        onClick={handleTransfer}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Đang gửi..." : "Gửi tiền"}
      </button>
    </div>
  );
};

export default Transfer;
