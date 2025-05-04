import { useEffect, useState, useCallback } from "react";
import Web3Service from "../../../services/web3Service";
import { contractAddress } from "../config/contract-config";
import { ABI_ALL_PRODUCTS } from "./ABI-for-get-all";

interface Product {
  id: number;
  owner: string;
  name: string;
  description: string;
  imageCID: string;
  price: string;
  isSold: boolean;
}

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const web3 = Web3Service.getInstance().getWeb3();
      const contract = new web3.eth.Contract(ABI_ALL_PRODUCTS, contractAddress);
      const count = Number(await contract.methods.productCount().call());

      const items: Product[] = [];

      for (let i = 1; i <= count; i++) {
        const prod: any = await contract.methods.getProduct(i).call();

        items.push({
          id: Number(prod[0]),
          owner: prod[1],
          name: prod[2],
          description: prod[3],
          imageCID: prod[4],
          price: web3.utils.fromWei(prod[5], "ether"),
          isSold: prod[6],
        });
      }

      setProducts(items);
    } catch (err: any) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};
