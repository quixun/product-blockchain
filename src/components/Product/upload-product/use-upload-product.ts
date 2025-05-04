import { useState } from "react";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import { UPLOAD_PRODUCT_ABI } from "./ABI-for-upload";
import Web3Service from "../../../services/web3Service";
import { contractAddress } from "../config/contract-config";

const ipfs = create({ url: import.meta.env.VITE_IPFS_API_URL });

export function useUploadProduct(account: string | null) {
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState("");
  const [error, setError] = useState<string | null>(null);

  const uploadProduct = async (
    name: string,
    description: string,
    priceInEth: string,
    file: File
  ) => {
    if (!account || !name || !priceInEth || !file || !description) {
      setError("Missing fields");
      return;
    }

    setLoading(true);
    try {
      const web3: Web3 = Web3Service.getInstance().getWeb3();
      const contract = new web3.eth.Contract(
        UPLOAD_PRODUCT_ABI,
        contractAddress
      );

      const added = await ipfs.add(file);
      const imageCID = added.cid.toString();
      setCid(imageCID);

      const priceInWei = web3.utils.toWei(priceInEth, "ether");

      await contract.methods
        .uploadProduct(name, description, imageCID, priceInWei)
        .send({ from: account, gas: "1000000" });

      setError(null);
      return { success: true, cid: imageCID };
    } catch (err) {
      console.error(err);
      setError("failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { uploadProduct, loading, cid, error };
}
