//@ts-nocheck
import { main } from "@/app/api/mint-nft/get";
import { useActiveAccount, ConnectButton  } from "thirdweb/react";
import { mintWithSignature } from "thirdweb/extensions/erc721";
import { defineChain } from "thirdweb/chains";
import { sendAndConfirmTransaction, createThirdwebClient, getContract  } from "thirdweb";



export default function Home() {
  const wallet = useActiveAccount()?.address;
  const account = useActiveAccount();
  const client = createThirdwebClient({
    clientId: "aa99b0e9769d2262d120e7aec4ec7a94",
  });
const image = `/public/path/to/your/output_${wallet}.png`;

  console.log(wallet)
  async function mint() {
    let { payload, signature } = await main(wallet, image);
    
    const contract = getContract({
      client,
      chain: defineChain(656476),
      address: "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db",
    });

    const transaction = mintWithSignature({
      contract,
      payload,
      signature,
    });
    await sendAndConfirmTransaction({ transaction, account });
  }
  return (
    <>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
        url: "https://example.com",
        }}
      />
      <button onClick={mint}>MINT</button>
    </>
  );
}