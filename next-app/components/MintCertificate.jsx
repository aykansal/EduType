"use client";

import { main } from "@/app/api/mint-nft/get";
import { useActiveAccount } from "thirdweb/react";
import { mintWithSignature } from "thirdweb/extensions/erc721";
import { defineChain } from "thirdweb/chains";
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CONTRACT_ADDRESS = "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db";
const CHAIN_ID = 656476;
const CLIENT_ID = "aa99b0e9769d2262d120e7aec4ec7a94";

export default function Home({ name, description, image }) {
  const [minting, setMinting] = useState(false);
  const [isMintedOnce, setIsMintedOnce] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const activeAccount = useActiveAccount();
  const wallet = activeAccount?.address;

  const client = createThirdwebClient({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    const mintStatus = localStorage.getItem("mintStatus");
    setIsMintedOnce(mintStatus === "true");

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError("Failed to load NFT image");
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [image]);

  useEffect(() => {
    if (!name || !description || !image) {
      setError("Missing required NFT metadata");
    }
  }, [name, description, image]);

  const handleError = (error, message) => {
    console.error(message, error);
    setError(message);
    setMinting(false);
  };

  async function mint() {
    if (!wallet) {
      handleError(null, "Please connect your wallet first");
      return;
    }

    setMinting(true);
    setError(null);
    setSuccess(false);

    try {
      const { payload, signature } = await main(
        wallet,
        name,
        description,
        image
      ).catch((error) => {
        throw new Error(`Failed to get signature: ${error.message}`);
      });

      const contract = getContract({
        client,
        chain: defineChain(CHAIN_ID),
        address: CONTRACT_ADDRESS,
      });

      const transaction = mintWithSignature({
        contract,
        payload,
        signature,
      });

      const mintResponse = await sendAndConfirmTransaction({
        transaction,
        account: activeAccount,
      });

      console.log("Mint successful:", mintResponse);
      localStorage.setItem("mintStatus", "true");
      setIsMintedOnce(true);
      setSuccess(true);
      setShowTooltip(true);

    } catch (error) {
      if (error.message.includes("user rejected")) {
        handleError(error, "Transaction was rejected by user");
      } else if (error.message.includes("insufficient funds")) {
        handleError(error, "Insufficient funds to complete transaction");
      } else {
        handleError(error, `Failed to mint NFT: ${error.message}`);
      }
    } finally {
      setMinting(false);
    }
  }

  const buttonText = minting 
    ? "Minting..." 
    : isMintedOnce 
    ? "Already Minted" 
    : "Mint";

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="bg-gray-200 rounded-lg h-64" />
        <div className="bg-gray-200 rounded h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>NFT successfully minted!</AlertDescription>
        </Alert>
      )}

      {imageLoaded && (
        <>
          <div className="relative">
            {/* <img 
              src={image} 
              alt={name} 
              className="shadow-lg rounded-lg w-full"
            /> */}
          </div>

          <TooltipProvider delayDuration={0}>
            <Tooltip open={isMintedOnce && showTooltip}>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <Button 
                    disabled={minting || isMintedOnce || !!error} 
                    onClick={mint}
                    className="w-full"
                    onMouseEnter={() => isMintedOnce && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    {buttonText}
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="z-50 bg-black shadow-lg p-2 rounded text-white"
                sideOffset={5}
              >
                <p>NFT already added to your Wallet. You can mint next after 3 hrs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
}