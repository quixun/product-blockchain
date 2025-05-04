import React, { useState } from "react";
import { useAppDispatch } from "../../features/hooks";
import Web3Service from "../../services/web3Service";
import { login } from "../../features/account/accountSlice";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const [privateKey, setPrivateKey] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!privateKey.trim()) {
      return;
    }
    try {
      setIsLoading(true);
      const web3 = Web3Service.getInstance().getWeb3();
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const balance = await web3.eth.getBalance(account.address);
      const nonce = await web3.eth.getTransactionCount(account.address);

      console.log(account);

      dispatch(
        login({
          address: account.address,
          balance: web3.utils.fromWei(balance, "ether"),
          nonce: nonce.toString(),
          status: true,
        })
      );

      navigate("/");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Đăng nhập Web3
        </h2>
        <input
          type="password"
          placeholder="Nhập Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className={`w-full mt-4 p-3 text-white font-semibold rounded-lg transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
