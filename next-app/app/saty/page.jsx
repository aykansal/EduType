import React from "react";
import MintCertificate from "@/components/satyansh-components/MintCertificate";
import certificate from "@/public/images/output_0xdfsfdfs-1.png";
export default function page() {
  return (
    <div className="bg-cyan-100 justify-center flex items-center h-screen w-full">
      <MintCertificate
        name={"test nft"}
        description={"this is something new I try"}
        image={"/images/output_0xdfsfdfs-1.png"}
      />
    </div>
  );
}
