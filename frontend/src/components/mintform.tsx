"use client";

import { useState } from "react";
import { useStacks } from "@/hooks/use-stacks";
import { mintTokenTx, parseToken, OWNER_ADDRESS } from "@/lib/contract";

export default function MintForm() {
  const { userData, makeContractCall, isLoading, error } = useStacks();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userAddress = userData?.profile?.stxAddress?.testnet || "";
  const isOwner = userAddress === OWNER_ADDRESS;

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      alert("Please connect your wallet first");
      return;
    }

    if (!isOwner) {
      alert("Only contract owner can mint tokens");
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

    setIsSubmitting(true);

    try {
      const amountInMicroTokens = parseToken(parseFloat(amount));
      const txOptions = mintTokenTx(amountInMicroTokens, to.trim());

      await makeContractCall({
        ...txOptions,
        onFinish: (data: any) => {
          console.log("Mint transaction submitted:", data);
          setTo("");
          setAmount("");
          alert(`Mint transaction submitted! TX ID: ${data.txId}`);
        },
      });
    } catch (err: any) {
      console.error("Mint error:", err);
      alert(`Mint failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData) {
    return (
      <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
        <h2 className="text-yellow-400 text-lg font-semibold mb-4">
          Mint Tokens (Owner Only)
        </h2>
        <div className="text-center py-8 text-yellow-300">
          🔗 Please connect your wallet to mint tokens
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="bg-black border border-red-500 rounded-lg p-6 shadow-lg">
        <h2 className="text-red-400 text-lg font-semibold mb-4">
          Access Denied
        </h2>
        <div className="text-center py-8 text-red-300">
          ⚠️ Only contract owner can mint tokens
          <div className="text-sm text-gray-400 mt-2">
            Your address: {userAddress}
          </div>
          <div className="text-sm text-gray-400">
            Owner address: {OWNER_ADDRESS}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
      <h2 className="text-yellow-400 text-lg font-semibold mb-4">
        Mint Tokens (Owner Only)
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded-lg text-red-300">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleMint} className="space-y-4">
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
            Enter the Stacks address that will receive the tokens
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Amount (WTK)
          </label>
          <input
            type="number"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
            step="0.000001"
            min="0"
            className="w-full p-3 rounded-lg bg-gray-900 text-yellow-300 border border-yellow-600 focus:border-yellow-400 focus:outline-none disabled:opacity-50"
          />
          <div className="text-xs text-gray-400 mt-1">
            {amount && !isNaN(parseFloat(amount)) && 
              `= ${parseToken(parseFloat(amount)).toLocaleString()} microWTK`
            }
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            isSubmitting || isLoading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700"
          }`}
        >
          {isSubmitting ? "Minting..." : "🪙 Mint Tokens"}
        </button>
      </form>

      <div className="mt-4 p-3 bg-gray-900 rounded-lg">
        <div className="text-xs text-gray-400">
          💡 <strong>Info:</strong> Setelah mint berhasil, token akan langsung masuk ke alamat penerima. 
          Transaksi membutuhkan waktu ~10 detik untuk konfirmasi.
        </div>
      </div>
    </div>
  );
}
