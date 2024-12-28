import { createThirdwebClient } from "thirdweb";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { privateKeyToAccount } from "thirdweb/wallets";
import { generateMintSignature } from "thirdweb/extensions/erc721";

export async function main(address: any) {
  const client = createThirdwebClient({
    secretKey: "pBr6QKgy5Vs07dn4R466IJLIOeE3eltu-8y-XhT3rfjIZOBWUsLrnwMmgFaTyOnqgk2gJLE7nlwP7k_nmpu0dA",
  });

  const account = privateKeyToAccount({
    client,
    privateKey: "8d2c7470b3578a52ae6b2dbc2aad58396f6ee7f95d2bdac1c8e56f22bf99c37f",
  });

  const contract = getContract({
    client,
  chain: defineChain(656476),
    address: "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db",
  });

  const { payload, signature } = await generateMintSignature({
    account,
    contract,
    mintRequest: {
      to: address,
      metadata: {
        name: "My NFT",
        description: "This is my NFT",
        image: "https://example.com/image.png",
      },

      price: "0.01",
      royaltyRecipient: address,
      royaltyBps: 0,
      primarySaleRecipient: address,
    },
  });

  return {
    payload: payload,
    signature: signature,
  };
}