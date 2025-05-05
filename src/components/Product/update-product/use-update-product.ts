import { useState } from "react";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import Web3Service from "../../../services/web3Service";
import { contractAddress } from "../config/contract-config";
import { UPDATE_PRODUCT_ABI } from "./ABI-for-update";

const ipfs = create({ url: import.meta.env.VITE_IPFS_API_URL });

export function useUpdateProduct(account: string | null) {
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState("");
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (
    id: number,
    name: string,
    description: string,
    priceInEth: string,
    existingImageCID: string,
    file?: File
  ) => {
    if (!account || id === undefined || !name || !description || !priceInEth) {
      setError("Missing fields");
      return;
    }

    setLoading(true);
    try {
      const web3: Web3 = Web3Service.getInstance().getWeb3();
      const contract = new web3.eth.Contract(
        UPDATE_PRODUCT_ABI,
        contractAddress
      );

      let imageCID = existingImageCID;

      if (file) {
        const added = await ipfs.add(file);
        imageCID = added.cid.toString();
        setCid(imageCID);
      }

      const priceInWei = web3.utils.toWei(priceInEth, "ether");

      await contract.methods
        .updateProductInfo(id, name, description, imageCID, priceInWei)
        .send({ from: account, gas: "1000000" });

      setError(null);
      return { success: true, cid: imageCID };
    } catch (err) {
      console.error(err);
      setError("Update failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, cid, error };
}
