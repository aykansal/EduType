"use client"

import { main } from "@/app/api/mint-nft/get"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { mintWithSignature } from "thirdweb/extensions/erc721"
import { defineChain } from "thirdweb/chains"
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract
} from "thirdweb"
import { Button } from "../ui/button"

export default function Home({name, description, image}) {
  const wallet = useActiveAccount()?.address
  const account = useActiveAccount()
  const client = createThirdwebClient({
    clientId: "aa99b0e9769d2262d120e7aec4ec7a94"
  })
  
  console.log(typeof(image))

  async function mint() {
    if (account) {
      const { payload, signature } = await main(wallet, name, description, image)

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
      <Button onClick={mint}>Mint</Button>
    </>
  )
}
