"use client";

import Link from "next/link";
import Wallet from "./ThirdWebWallet";
import { motion } from "framer-motion";
import { useActiveAccount } from "thirdweb/react";

const navLinks = [
  { href: "/typing-tutor", label: "Typing Tutor" },
  { href: "/certification", label: "Certification" },
  { href: "/arena", label: "Arena" },
  { href: "/learn", label: "Learn" },
];

export function NavBar() {
  const account = useActiveAccount();

  return (
    <motion.nav
      className="px-6 py-4 w-full"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mx-auto max-w-7xl">
        <Link
          href="/"
          className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-2xl text-transparent"
        >
          EduType
        </Link>
        <div className="flex items-center gap-4">
          {account?.address && (
            <div className="md:flex items-center space-x-8 hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <Wallet />
        </div>
      </div>
    </motion.nav>
  );
}
