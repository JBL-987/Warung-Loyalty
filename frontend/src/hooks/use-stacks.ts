"use client";

import { getBalance } from "@/lib/contract";
import {
  AppConfig,
  showConnect,
  openContractCall,
  type UserData,
  UserSession,
} from "@stacks/connect";
import { useEffect, useState } from "react";
import { STACKS_TESTNET } from "@stacks/network";

const appDetails = {
  name: "Warung Loyalty Token",
  icon: "/logo.png", // pastikan file ini ada di public/
};

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function connectWallet() {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }

  function disconnectWallet() {
    userSession.signUserOut();
    setUserData(null);
    setTokenBalance(0);
  }

  // Function untuk melakukan contract call
  async function makeContractCall(options: any) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await openContractCall({
        ...options,
        network: STACKS_TESTNET,
        onFinish: (data: any) => {
          console.log("Transaction submitted:", data);
          // Refresh balance setelah transaksi
          setTimeout(() => {
            refreshBalance();
          }, 3000);
        },
        onCancel: () => {
          console.log("Transaction cancelled");
          setIsLoading(false);
        },
      });
      
      return result;
    } catch (err: any) {
      console.error("Contract call error:", err);
      setError(err.message || "Transaction failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Function untuk refresh balance
  async function refreshBalance() {
    if (userData) {
      try {
        const address = userData.profile.stxAddress.testnet;
        const balance = await getBalance(address);
        setTokenBalance(balance);
      } catch (err) {
        console.error("Error refreshing balance:", err);
      }
    }
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  useEffect(() => {
    if (userData) {
      refreshBalance();
    }
  }, [userData]);

  return {
    userData,
    tokenBalance,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    makeContractCall,
    refreshBalance,
    clearError: () => setError(null),
  };
}