export const UPLOAD_PRODUCT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "string", name: "_imageCID", type: "string" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "uploadProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
