"use client";

import MintForm from "@/components/mintform";
import { useStacks } from "@/hooks/use-stacks";
import { OWNER_ADDRESS, getTotalSupply, formatToken } from "@/lib/contract";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { userData } = useStacks();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const userAddress = userData?.profile?.stxAddress?.testnet || "";
  const isOwner = userAddress === OWNER_ADDRESS;

  // Fetch total supply
  useEffect(() => {
    const fetchTotalSupply = async () => {
      setIsLoading(true);
      try {
        const supply = await getTotalSupply();
        setTotalSupply(supply);
      } catch (error) {
        console.error("Error fetching total supply:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalSupply();
  }, []);

  const refreshTotalSupply = async () => {
    setIsLoading(true);
    try {
      const supply = await getTotalSupply();
      setTotalSupply(supply);
    } catch (error) {
      console.error("Error refreshing total supply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              ⚙️ Admin Panel
            </h1>
            <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg">
              <div className="text-yellow-300 mb-4">
                🔗 Please connect your wallet to access admin panel
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-red-400 mb-4">
              ⚠️ Access Denied
            </h1>
            <div className="bg-black border border-red-500 rounded-lg p-8 shadow-lg">
              <div className="text-red-300 mb-4">
                Hanya pemilik kontrak yang bisa mengakses halaman ini.
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>
                  <strong>Your Address:</strong>
                  <br />
                  <code className="bg-gray-800 px-2 py-1 rounded">
                    {userAddress}
                  </code>
                </div>
                <div>
                  <strong>Owner Address:</strong>
                  <br />
                  <code className="bg-gray-800 px-2 py-1 rounded">
                    {OWNER_ADDRESS}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">
            ⚙️ Admin Panel
          </h1>
          <p className="text-yellow-200">
            Kelola Warung Token sebagai pemilik kontrak
          </p>
          <div className="mt-4 inline-block bg-green-900/30 border border-green-500/50 rounded-lg px-4 py-2">
            <span className="text-green-400 text-sm">
              ✅ Verified Owner Access
            </span>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-yellow-400">
              📊 Token Statistics
            </h2>
            <button
              onClick={refreshTotalSupply}
              disabled={isLoading}
              className={`text-sm px-3 py-1 rounded-lg transition-all ${
                isLoading
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-yellow-600 text-black hover:bg-yellow-500"
              }`}
            >
              {isLoading ? "⟳" : "🔄"} Refresh
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-2xl text-center mb-2">🪙</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  {isLoading ? "..." : formatToken(totalSupply)}
                </div>
                <div className="text-sm text-gray-400">Total Supply (WTK)</div>
                <div className="text-xs text-gray-500 mt-1">
                  {totalSupply.toLocaleString()} microWTK
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-2xl text-center mb-2">🏪</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">Active</div>
                <div className="text-sm text-gray-400">Contract Status</div>
                <div className="text-xs text-gray-500 mt-1">Stacks Testnet</div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="text-2xl text-center mb-2">👤</div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-400 break-all">
                  {userAddress.substring(0, 8)}...
                  {userAddress.substring(userAddress.length - 8)}
                </div>
                <div className="text-sm text-gray-400">Owner Address</div>
                <div className="text-xs text-gray-500 mt-1">You are here</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mint Token Section */}
        <section>
          <MintForm />
        </section>

        {/* Admin Instructions */}
        <section className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            📋 Panduan Admin
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-yellow-300 font-semibold mb-2 flex items-center gap-2">
                🪙 Mint Tokens
              </h3>
              <p className="text-gray-400 text-sm">
                Sebagai owner, Anda dapat mint (membuat) token baru untuk diberikan kepada pelanggan. 
                Masukkan alamat penerima dan jumlah token yang ingin diberikan.
              </p>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-yellow-300 font-semibold mb-2 flex items-center gap-2">
                💡 Tips Penggunaan
              </h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Berikan token sebagai reward untuk pembelian pelanggan</li>
                <li>• 1 WTK = 1,000,000 microWTK (6 decimal places)</li>
                <li>• Setiap transaksi membutuhkan gas fee dalam STX</li>
                <li>• Token dapat ditransfer antar pengguna secara bebas</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-yellow-300 font-semibold mb-2 flex items-center gap-2">
                ⚠️ Keamanan
              </h3>
              <p className="text-gray-400 text-sm">
                Hanya alamat owner yang dapat melakukan mint. Jaga keamanan wallet Anda dan 
                jangan bagikan private key kepada siapapun.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}