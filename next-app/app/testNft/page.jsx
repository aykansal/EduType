"use client"

// import { useState } from 'react';
// import { useNFTMinting } from '@/hooks/something';

// export default function MintNFTPage() {
//   const { mintNFT, isLoading, error, mintedNFT } = useNFTMinting();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     imageUrl: ''
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, description, imageUrl } = formData;
//     await mintNFT(imageUrl, name, description);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="mx-auto p-6 max-w-2xl">
//       <h1 className="mb-6 font-bold text-3xl">Mint Your NFT</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block mb-1 font-medium text-sm">
//             NFT Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="p-2 border rounded w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block mb-1 font-medium text-sm">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="p-2 border rounded w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="imageUrl" className="block mb-1 font-medium text-sm">
//             Image URL
//           </label>
//           <input
//             type="url"
//             id="imageUrl"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleInputChange}
//             className="p-2 border rounded w-full"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full p-3 rounded ${
//             isLoading
//               ? 'bg-gray-400'
//               : 'bg-blue-600 hover:bg-blue-700'
//           } text-white font-medium`}
//         >
//           {isLoading ? 'Minting...' : 'Mint NFT'}
//         </button>
//       </form>

//       {error && (
//         <div className="bg-red-100 mt-4 p-4 rounded text-red-700">
//           {error}
//         </div>
//       )}

//       {mintedNFT && (
//         <div className="bg-green-100 mt-4 p-4 rounded text-green-700">
//           <h2 className="font-bold">NFT Minted Successfully!</h2>
//           <p>Token ID: {mintedNFT.tokenId}</p>
//           <p>Transaction Hash: {mintedNFT.receipt.transactionHash}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { main } from "@/app/api/mint-nft/get"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { mintWithSignature } from "thirdweb/extensions/erc721"
import { defineChain } from "thirdweb/chains"
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract
} from "thirdweb"

export default function Home() {
  const wallet = useActiveAccount()?.address
  const account = useActiveAccount()
  const client = createThirdwebClient({
    clientId: "aa99b0e9769d2262d120e7aec4ec7a94"
  })

  async function mint() {
    if (account) {
      const { payload, signature } = await main(wallet)

      const contract = getContract({
        client,
        chain: defineChain(656476),
        address: "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db"
      })

      const transaction = mintWithSignature({
        contract,
        payload,
        signature
      })

      await sendAndConfirmTransaction({ transaction, account })
    } else {
      console.error("no wallet connected")
    }
  }

  return (
    <>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com"
        }}
      />
      <button onClick={mint}>MINT</button>
    </>
  )
}
