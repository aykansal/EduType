import { ConnectButton } from "thirdweb/react";
import { defineChain, createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

const chain = defineChain(656476);
const client = createThirdwebClient({
  clientId: "4f4d7aad88cd12953957137f0f7c0081",
  // chains: [chain], // Ensure the custom chain is recognized by the client
});

export default function Wallet() {
  return (
    <ConnectButton
      chain={chain}
      client={client}
      signInButton={{
        label: "Sign in now!",
      }}
      wallets={[createWallet("io.metamask")]}
    />
  );
}
