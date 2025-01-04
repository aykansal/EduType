"use client"
import { useState, useEffect } from "react";
import { main } from "@/app/api/mint-nft/get";
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { mintWithSignature } from "thirdweb/extensions/erc721"
import { defineChain } from "thirdweb/chains"
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract
} from "thirdweb"

export const useMint = () => {
  const [isMinting, setIsMinting] = useState(false);
  const wallet = useActiveAccount()?.address;
  const account = useActiveAccount();
  
  // Create the thirdweb client
  const client = createThirdwebClient({
    clientId: "aa99b0e9769d2262d120e7aec4ec7a94",
  });

  const image = `/public/path/to/your/output_${wallet}.png`;

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  // Mint function encapsulated in the hook
  const mint = async () => {
    if (!wallet) return;

    setIsMinting(true);

    try {
      // Prepare payload and signature
      let { payload, signature } = await main(wallet, image);

      // Get contract instance
      const contract = getContract({
        client,
        chain: defineChain(656476),
        address: "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db",
      });

      // Prepare transaction and send it
      const transaction = mintWithSignature({
        contract,
        payload,
        signature,
      });
      await sendAndConfirmTransaction({ transaction, account });
    } catch (error) {
      console.error("Minting failed:", error);
    } finally {
      setIsMinting(false);
    }
  };

  return {
    isMinting,
    mint,
  };
};
