import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../components/home";
import Login from "../components/login";
import PrivateRoute from "./PrivateRoute";
import Header from "../layouts/header/Header";
import Transfer from "../components/transfer/Transfer";
import Transactions from "../components/transactions";
import UploadProduct from "../components/Product/upload-product/upload-product";
import GetProduct from "../components/Product/get-product/get-product";
import ProductDetail from "../components/Product/get-product/product-detail";
import MyProducts from "../components/Product/get-product/my-products";
import UpdateProduct from "../components/Product/update-product/update-product";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Header />}>
            <Route index element={<Home />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="upload-product" element={<UploadProduct />} />
            <Route path="products" element={<GetProduct />} />
            <Route path="my-products" element={<MyProducts />} />
            <Route path="product-detail/:productName" element={<ProductDetail />} />
            <Route path="update-product/:productName" element={<UpdateProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
