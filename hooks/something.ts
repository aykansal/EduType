//@ts-nocheck
// // import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// // import * as fs from 'fs';

// // const main = async () => {
// //   const sdk = new ThirdwebSDK("mumbai");
// //   const contract = await sdk.getContract("CONTRACT", "nft-collection");

// //   // Address of the wallet you want to mint the NFT to
// //   const walletAddress = "WALLET_ADDRESS";

// //   // Custom metadata of the NFTs you want to mint.
// //   const metadatas = [{
// //     name: "Cool NFT #1",
// //     description: "This is a cool NFT",
// //     image: fs.readFileSync("https://ipfs.filebase.io/ipfs/IPFS_CID/0.png"), // This can be an image url or file
// //   }, {
// //     name: "Cool NFT #2",
// //     description: "This is a cool NFT",
// //     image: fs.readFileSync("https://ipfs.filebase.io/ipfs/IPFS_CID/1.png"),
// //   }];

// //   const tx = await contract.mintBatchTo(walletAddress, metadatas);
// //   const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
// //   const firstTokenId = tx[0].id; // token id of the first minted NFT
// //   const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
// // };

// // main();


// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import * as fs from 'fs';

// const main = async () => {
//   const customChain = {
//     rpc: ["https://open-campus-codex-sepolia.drpc.org"],
//     chainId: 656476, // Replace with your custom chain ID
//     name: "Open Campus Codex",
//     nativeCurrency: {
//       name: "Open Campus Codex",
//       symbol: "EDU",
//       decimals: 18,
//     },
//     blockExplorerUrl: "https://edu-chain-testnet.blockscout.com", // Optional
//   };

//   const sdk = new ThirdwebSDK(customChain);
//   const contract = await sdk.getContract("0xD67F283F952649759e597eCeb1B6d9B954B7bB55", "EduType");

//   // Address of the wallet you want to mint the NFT to
//   const walletAddress = "0x7b1F7C1edFBaeE620D0120cF0C074aB0AB6563FD";

//   // Custom metadata of the NFTs you want to mint.
//   const metadatas = [{
//     name: "Cool NFT #1",
//     description: "This is a cool NFT",
//     image: fs.readFileSync("https://ipfs.filebase.io/ipfs/QmV9Xb581LF5HeTm7G12Mm68W59yFrKxwcc58J3g3wtVFM/0.png"), // This can be an image url or file
//   }];

//   const tx = await contract.mintBatchTo(walletAddress, metadatas);
//   const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
//   const firstTokenId = tx[0].id; // token id of the first minted NFT
//   const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
// };

// main();

// hooks/useNFTMinting.ts
// hooks/useNFTMinting.ts
import { useState } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const customChain = {
  // Required parameters
  chainId: 656476,
  rpc: ["https://open-campus-codex-sepolia.drpc.org"],
  nativeCurrency: {
    name: "Open Campus Codex",
    symbol: "EDU",
    decimals: 18,
  },
  // Required by Zod validation
  slug: "open-campus-codex",
  name: "Open Campus Codex",
  chain: "Open Campus Codex",
  shortName: "OCX",
  testnet: true,
  icon: {
    url: "https://example.com/icon.png",
    width: 512,
    height: 512,
    format: "png"
  },
  // Optional but recommended
  blockExplorerUrl: "https://edu-chain-testnet.blockscout.com",
};

export const useNFTMinting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mintedNFT, setMintedNFT] = useState<any>(null);

  const mintNFT = async (imageUrl: string, name: string, description: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sdk = new ThirdwebSDK(customChain);
      const contract = await sdk.getContract(
        "0xD67F283F952649759e597eCeb1B6d9B954B7bB55",
        "EduType"
      );

      const walletAddress = "0x7b1F7C1edFBaeE620D0120cF0C074aB0AB6563FD";
      
      const metadatas = [{
        name,
        description,
        image: imageUrl,
      }];

      const tx = await contract.mintBatchTo(walletAddress, metadatas);
      const receipt = tx[0].receipt;
      const firstTokenId = tx[0].id;
      const firstNFT = await tx[0].data();

      setMintedNFT({
        receipt,
        tokenId: firstTokenId,
        nftData: firstNFT
      });

      return { success: true, data: firstNFT };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mint NFT';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintNFT,
    isLoading,
    error,
    mintedNFT
  };
};