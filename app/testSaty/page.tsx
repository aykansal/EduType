//@ts-nocheck
"use client"
import React, { useState } from 'react';
import { useStorageUpload, useContract, useAddress, useSDK } from "@thirdweb-dev/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";

const NFTMinter = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const address = useAddress();
  const sdk = useSDK();
  const { mutateAsync: upload } = useStorageUpload();
  const { contract } = useContract("YOUR_CONTRACT_ADDRESS", "nft-collection");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    
    if (!file || !name || !description || !address) {
      alert("Please fill all fields and connect wallet");
      return;
    }

    try {
      // Upload to IPFS
      setIsUploading(true);
      const uploadUrl = await upload({
        data: [file],
        options: { uploadWithGatewayUrl: true }
      });
      setIsUploading(false);

      // Mint NFT
      setIsMinting(true);
      const metadata = {
        name,
        description,
        image: uploadUrl[0]
      };

      const mintTx = await contract.mintTo(address, metadata);
      const receipt = await mintTx.receipt;
      const tokenId = mintTx.id;
      const nft = await mintTx.data();

      alert(`NFT minted successfully! Token ID: ${tokenId}`);
      
      // Reset form
      setName("");
      setDescription("");
      setFile(null);
      
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT. Check console for details.");
    } finally {
      setIsUploading(false);
      setIsMinting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mint your NFT</CardTitle>
        <CardDescription>Upload an image and mint it as an NFT</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleMint} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="NFT Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="NFT Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-8 w-8 mb-2" />
              <span className="text-sm">
                {file ? file.name : "Click to upload image"}
              </span>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isUploading || isMinting || !file || !name || !description}
          >
            {(isUploading || isMinting) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isUploading ? "Uploading to IPFS..." : 
             isMinting ? "Minting NFT..." : 
             "Mint NFT"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NFTMinter;