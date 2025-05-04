import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../features/hooks";
import { RootState } from "../../features/store";
import JazziconClone from "./JazziconClone";
import { logout } from "../../features/account/accountSlice";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { status, address, balance } = useAppSelector(
    (state: RootState) => state.account
  );
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <>
      <header className="bg-black text-white py-6 px-10 shadow-md gap-10 flex items-center justify-between">
        <img
          src="/product-example/dapp-logo.png"
          alt="logo"
          className="w-30 h-auto object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        {status && balance && address ? (
          <nav className="flex items-center gap-4 w-full justify-between">
            <div className="flex gap-2">
              {[
                { text: "Market", link: "/products" },
                { text: "My Products", link: "/my-products" },
                { text: "Sell", link: "/upload-product" },
              ].map((nav) => {
                const isActive = location.pathname === nav.link;
                return (
                  <button
                    key={nav.link}
                    onClick={() => navigate(nav.link)}
                    className={`px-4 py-2 rounded-lg cursor-pointer text-lg transition ${
                      isActive
                        ? "text-white font-semibold underline-offset-4"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {nav.text}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowModal((prev) => !prev)}
                className="bg-[#4450AE] hover:bg-[#4450AE]/90 transition-colors px-4 py-2 rounded-lg cursor-pointer items-center flex gap-3"
              >
                {balance.slice(0, 9)} {address.slice(0, 6)}...
                {address.slice(-4)}
                <JazziconClone address={address} size={30} />
              </button>

              {showModal && (
                <div
                  ref={modalRef}
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl z-50 p-4 text-sm text-black"
                >
                  <p>
                    <strong>Account:</strong>
                    <br />
                    {address.slice(0, 16)}...
                    {address.slice(-10)}
                  </p>
                  <p className="mt-2">
                    <strong>Balance:</strong> {parseFloat(balance).toFixed(4)}{" "}
                    ETH
                  </p>
                  <p className="mt-2">
                    <strong>Network:</strong> Garnacho
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => dispatch(logout())}
                      className="bg-red-500 text-white py-1.5 rounded hover:bg-red-600"
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => {
                        navigate("/");
                        setShowModal(false);
                      }}
                      className="bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate("/transfer");
                        setShowModal(false);
                      }}
                      className="bg-gray-100 text-black py-1.5 rounded hover:bg-gray-200"
                    >
                      Transfer
                    </button>
                    <button
                      onClick={() => {
                        navigate("/transactions");
                        setShowModal(false);
                      }}
                      className="bg-gray-100 text-black py-1.5 rounded hover:bg-gray-200"
                    >
                      Transaction History
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <button
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
        )}
      </header>

      <Outlet />
    </>
  );
};

export default Header;
