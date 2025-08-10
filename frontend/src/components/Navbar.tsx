"use client";

import Link from "next/link";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress, formatToken, OWNER_ADDRESS } from "@/lib/contract";

export default function Navbar() {
  const { userData, tokenBalance, connectWallet, disconnectWallet } = useStacks();
  
  const userAddress = userData?.profile?.stxAddress?.testnet || "";
  const isOwner = userAddress === OWNER_ADDRESS;

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-4 h-16 border-b border-yellow-500 bg-black">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="text-2xl font-bold text-yellow-400">
          🪙 Warung Loyalty
        </div>
        <div className="text-xs text-gray-400 hidden sm:block">
          Loyalty System
        </div>
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-4 sm:gap-8">
        <Link
          href="/"
          className="text-yellow-300 hover:text-yellow-100 transition-colors text-sm sm:text-base"
        >
          🏠 Home
        </Link>
        
        {isOwner && (
          <Link
            href="/admin"
            className="text-yellow-300 hover:text-yellow-100 transition-colors text-sm sm:text-base flex items-center gap-1"
          >
            ⚙️ Admin
            <span className="hidden sm:inline text-xs bg-red-600 text-white px-2 py-1 rounded-full">
              Owner
            </span>
          </Link>
        )}
        
        {userData && (
          <div className="hidden sm:flex items-center text-xs text-gray-300">
            Balance: {formatToken(tokenBalance)} WTK
          </div>
        )}
      </div>

      {/* Wallet Connection */}
      <div className="flex items-center gap-2">
        {userData ? (
          <div className="flex items-center gap-2">
            {/* User Info */}
            <div className="flex flex-col items-end text-xs">
              <span className="text-yellow-300 font-mono">
                {abbreviateAddress(userAddress)}
              </span>
              <span className="text-gray-400 sm:hidden">
                {formatToken(tokenBalance)} WTK
              </span>
            </div>
            
            {/* Disconnect Button */}
            <button
              type="button"
              onClick={disconnectWallet}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm font-medium text-black hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all"
          >
            🔗 Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}