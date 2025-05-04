import { useEffect, useState } from "react";
import Web3Service from "../../services/web3Service";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { address } = useSelector((state: RootState) => state.account);
  const web3 = Web3Service.getInstance().getWeb3();

  async function getTransactionsByAddress(address: string) {
    const latestBlock = await web3.eth.getBlockNumber();

    let txs: any[] = [];

    for (let i = 0; i <= latestBlock; i++) {
      let block = await web3.eth.getBlock(i, true);
      if (block && block.transactions) {
        let filteredTx = block.transactions.filter(
          (tx) =>
            typeof tx !== "string" &&
            (tx.from === address.toLowerCase() ||
              tx.to === address.toLowerCase())
        );
        txs.push(...filteredTx);
      }
    }

    return txs;
  }

  useEffect(() => {
    const fetchTransactions = async (address: string) => {
      const txs = await getTransactionsByAddress(address);
      setTransactions(txs);
    };

    if (address) {
      fetchTransactions(address);
    }
  }, [address]);

  return (
    <div>
      <h2>Danh sách giao dịch của địa chỉ #{address}</h2>
      {transactions.length > 0 ? (
        <>
          {transactions.map((tx) => (
            <div key={tx.hash} className="mt-5 p-2 border mx-2 rounded-md">
              <ul>
                <li>
                  <p>
                    <strong>Hash:</strong> {tx.hash}
                  </p>
                  <p>
                    <strong>From:</strong> {tx.from}
                  </p>
                  <p>
                    <strong>To:</strong> {tx.to}
                  </p>
                  <p>
                    <strong>Value:</strong>{" "}
                    {web3.utils.fromWei(tx.value, "ether")} ETH
                  </p>
                </li>
              </ul>
            </div>
          ))}
        </>
      ) : (
        <p>Không có giao dịch nào.</p>
      )}
    </div>
  );
};

export default Transactions;
