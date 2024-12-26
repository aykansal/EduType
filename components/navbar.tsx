"use client";

import Link from "next/link";
import Wallet from "./ThirdWebWallet";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getWalletInfo } from "thirdweb/wallets";

export function NavBar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wallets, setWallets] = useState<string>("");

  useEffect(() => {
    const fetchWalletInfo = async () => {
      const walletData = await getWalletInfo("io.metamask");
      setWallets(walletData.image_id);
    };
    fetchWalletInfo();
  }, []);

  return (
    <motion.nav
      className="w-full py-4 px-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
        >
          EduType
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/learn"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Learn
          </Link>
          <Link
            href="/typing-tutor"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Typing Tutor
          </Link>
          <Link
            href="/typing-test"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Typing Test
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/arena"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            Arena
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Wallet />
        </div>
      </div>
    </motion.nav>
  );
}
