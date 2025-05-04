import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const Home: React.FC = () => {
  const { address, balance, nonce } = useSelector(
    (state: RootState) => state.account
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thông Tin Cá Nhân
        </h2>
        <div className="text-left">
          <p className="text-gray-600">
            <strong>Địa chỉ ví:</strong> {address || "Chưa đăng nhập"}
          </p>
          <p className="text-gray-600">
            <strong>Số dư:</strong> {balance ? `${balance} ETH` : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Nonce:</strong> {nonce ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
