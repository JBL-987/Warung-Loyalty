"use client";

import { useState, useEffect } from "react";
import { abbreviateAddress, formatToken, explorerAddress } from "@/lib/contract";
import { useStacks } from "@/hooks/use-stacks";

export default function BalanceCard() {
  const { userData, tokenBalance, refreshBalance, isLoading } = useStacks();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setIsRefreshing(false);
  };

  if (!userData) {
    return (
      <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-yellow-400 text-lg font-semibold mb-2">
            Your WTK Balance
          </h2>
          <p className="text-yellow-300 mb-4">
            Connect your wallet to see your token balance
          </p>
          <div className="text-gray-500">
            🔗 Wallet not connected
          </div>
        </div>
      </div>
    );
  }

  const address = userData.profile.stxAddress.testnet;

  return (
    <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-yellow-400 text-lg font-semibold">
          Your WTK Balance
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`text-sm px-3 py-1 rounded-lg transition-all ${
            isRefreshing
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-yellow-600 text-black hover:bg-yellow-500"
          }`}
        >
          {isRefreshing ? "⟳" : "🔄"} Refresh
        </button>
      </div>

      <div className="space-y-3">
        {/* Balance Display */}
        <div className="text-center py-4 bg-gray-900 rounded-lg">
          <div className="text-3xl font-bold text-yellow-300">
            {isLoading ? (
              <div className="animate-pulse">Loading...</div>
            ) : (
              `${formatToken(tokenBalance)} WTK`
            )}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Raw: {tokenBalance.toLocaleString()} microWTK
          </div>
        </div>

        {/* Address Info */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Address:</span>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-mono">
              {abbreviateAddress(address)}
            </span>
            <a
              href={explorerAddress(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              title="View on Explorer"
            >
              🔗
            </a>
          </div>
        </div>

        {/* Network Info */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Network:</span>
          <span className="text-green-400">Stacks Testnet</span>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-black rounded-lg">
        <div className="text-xs text-gray-400">
          💡 <strong>Tips:</strong> The token will automatically refresh after the transaction is successful.
        Click refresh if the balance does not update.
        </div>
      </div>
    </div>
  );
}