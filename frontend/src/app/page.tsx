"use client";

import BalanceCard from "@/components/Balancecard";
import TransferForm from "@/components/transferform";
import { useStacks } from "@/hooks/use-stacks";

export default function HomePage() {
  const { userData } = useStacks();

  return (
    <div className="max-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400">
            🪙 Welcome to Warung Loyalty
          </h1>
          <p className="text-lg sm:text-xl text-yellow-200 max-w-2xl mx-auto">
            A simple reward system for loyal customers of your warung.  
            Collect loyalty tokens and enjoy various benefits!
          </p>
          
          {!userData && (
            <div className="mt-6 p-4 bg-black border border-yellow-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-yellow-300 text-sm">
                💡 Connect your wallet to start using Warung Token
              </p>
            </div>
          )}
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Balance Section */}
          <section>
            <BalanceCard />
          </section>

          {/* Transfer Section */}
          <section>
            <TransferForm />
          </section>
        </div>

        {/* Features Section */}
        <section className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            ✨ Warung Token Features
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl">🎁</div>
              <h3 className="text-yellow-300 font-semibold">Earn Rewards</h3>
              <p className="text-gray-400 text-sm">
                Earn WTK every time you shop at partner warungs
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-3xl">🔄</div>
              <h3 className="text-yellow-300 font-semibold">Easy Transfer</h3>
              <p className="text-gray-400 text-sm">
                Easily transfer tokens to friends or other warungs
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-3xl">🔒</div>
              <h3 className="text-yellow-300 font-semibold">Blockchain Secure</h3>
              <p className="text-gray-400 text-sm">
                Built on the secure and trusted Stacks blockchain
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            🚀 How to Use
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-600 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-yellow-300 font-semibold">Connect Wallet</h3>
                <p className="text-gray-400 text-sm">
                  Connect your Stacks wallet (Leather/Xverse) to get started
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-yellow-600 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-yellow-300 font-semibold">Receive Tokens</h3>
                <p className="text-gray-400 text-sm">
                  Warung owners will give WTK as purchase rewards
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-yellow-600 text-black w-8 h-8 rounded-full flex-col items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-yellow-300 font-semibold">Use & Transfer</h3>
                <p className="text-gray-400 text-sm">
                  Use tokens to shop or transfer to other users
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="text-center text-gray-400 text-sm">
          <p>
            Built with ❤️ using Clarity smart contracts on the Stacks blockchain
          </p>
          <p className="mt-1">
            🌐 Network: Stacks Testnet | 🔗 SIP-010 Compatible
          </p>
        </section>
      </div>
    </div>
  );
}
