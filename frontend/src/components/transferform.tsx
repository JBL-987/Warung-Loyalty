"use client";

import { useState } from "react";
import { useStacks } from "@/hooks/use-stacks";
import { transferTokenTx, parseToken, formatToken } from "@/lib/contract";

export default function TransferForm() {
  const { userData, tokenBalance, makeContractCall, isLoading, error } = useStacks();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userAddress = userData?.profile?.stxAddress?.testnet || "";
  const formattedBalance = formatToken(tokenBalance);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      alert("Please connect your wallet first");
      return;
    }

    if (!to.trim()) {
      alert("Please enter recipient address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter valid amount");
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount > formattedBalance) {
      alert(`Insufficient balance. You have ${formattedBalance} WTK`);
      return;
    }

    if (to.trim().toLowerCase() === userAddress.toLowerCase()) {
      alert("Cannot transfer to yourself");
      return;
    }

    setIsSubmitting(true);

    try {
      const amountInMicroTokens = parseToken(transferAmount);
      const txOptions = transferTokenTx(
        amountInMicroTokens, 
        userAddress, 
        to.trim(),
        memo.trim() || undefined
      );

      await makeContractCall({
        ...txOptions,
        onFinish: (data: any) => {
          console.log("Transfer transaction submitted:", data);
          setTo("");
          setAmount("");
          setMemo("");
          alert(`Transfer transaction submitted! TX ID: ${data.txId}`);
        },
      });
    } catch (err: any) {
      console.error("Transfer error:", err);
      alert(`Transfer failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setMaxAmount = () => {
    setAmount(formattedBalance.toString());
  };

  if (!userData) {
    return (
      <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
        <h2 className="text-yellow-400 text-lg font-semibold mb-4">
          Transfer Tokens
        </h2>
        <div className="text-center py-8 text-yellow-300">
          🔗 Please connect your wallet to transfer tokens
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-yellow-400 text-lg font-semibold">
          Transfer Tokens
        </h2>
        <div className="text-sm text-yellow-300">
          Balance: {formattedBalance} WTK
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded-lg text-red-300">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            placeholder="ST1ABCD... (Stacks address)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 rounded-lg bg-gray-900 text-yellow-300 border border-yellow-600 focus:border-yellow-400 focus:outline-none disabled:opacity-50"
          />
          <div className="text-xs text-gray-400 mt-1">
            Enter the recipient's Stacks address
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Amount (WTK)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="10.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isSubmitting}
              step="0.000001"
              min="0"
              max={formattedBalance}
              className="w-full p-3 rounded-lg bg-gray-900 text-yellow-300 border border-yellow-600 focus:border-yellow-400 focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={setMaxAmount}
              disabled={isSubmitting || formattedBalance === 0}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-yellow-600 text-black rounded hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              MAX
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {amount && !isNaN(parseFloat(amount)) && 
              `= ${parseToken(parseFloat(amount)).toLocaleString()} microWTK`
            }
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Memo (Optional)
          </label>
          <input
            type="text"
            placeholder="Transfer note (max 34 characters)"
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, 34))}
            disabled={isSubmitting}
            maxLength={34}
            className="w-full p-3 rounded-lg bg-gray-900 text-yellow-300 border border-yellow-600 focus:border-yellow-400 focus:outline-none disabled:opacity-50"
          />
          <div className="text-xs text-gray-400 mt-1">
            {memo.length}/34 characters
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading || formattedBalance === 0}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            isSubmitting || isLoading || formattedBalance === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700"
          }`}
        >
          {isSubmitting ? "Transferring..." : "🚀 Transfer Tokens"}
        </button>
      </form>

      <div className="mt-4 p-3 bg-gray-900 rounded-lg">
        <div className="text-xs text-gray-400">
          💡 <strong>Info:</strong> The transfer requires a gas fee (STX).
          Make sure you have STX to cover the transaction fee (approximately 0.001 STX).
        </div>
      </div>
    </div>
  );
}