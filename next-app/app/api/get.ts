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
        name: "My NFT 2 ",
        description: "This is my NFT 2",
        image: "data:image/png;base64,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",
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