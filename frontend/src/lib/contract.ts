import { STACKS_TESTNET } from "@stacks/network";
import {
  fetchCallReadOnlyFunction,
  uintCV,
  standardPrincipalCV,
  cvToValue,
  bufferCVFromString,
  someCV,
  noneCV,
} from "@stacks/transactions";

/**
 * Kontrak info - PASTIKAN ADDRESS INI SESUAI DENGAN KONTRAK YANG SUDAH DI-DEPLOY
 */
export const CONTRACT_ADDRESS = "ST2052P3NV494NZ9Q3DPNWX9ZXVDE5HHMRY0VAAFM";
export const CONTRACT_NAME = "warung-loyalty";
export const NETWORK = STACKS_TESTNET;
export const TOKEN_DECIMALS = 6;

// Owner address - GANTI DENGAN ADDRESS WALLET OWNER ASLI
export const OWNER_ADDRESS = "ST2052P3NV494NZ9Q3DPNWX9ZXVDE5HHMRY0VAAFM";

/* -------------------------
   Helper utilities
   ------------------------- */
export function abbreviateAddress(address: string) {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function abbreviateTxnId(txnId: string) {
  if (!txnId) return "";
  return `${txnId.substring(0, 6)}...${txnId.substring(txnId.length - 4)}`;
}

export function explorerAddress(address: string) {
  return `https://explorer.hiro.so/address/${address}?chain=testnet`;
}

export function explorerTxn(txnId: string) {
  return `https://explorer.hiro.so/txid/${txnId}?chain=testnet`;
}

export function formatToken(amount: number, decimals = TOKEN_DECIMALS) {
  return parseFloat((amount / 10 ** decimals).toFixed(6));
}

export function parseToken(amount: number, decimals = TOKEN_DECIMALS) {
  return Math.floor(amount * 10 ** decimals);
}

/* -------------------------
   Read-only contract calls
   ------------------------- */
export async function getName(): Promise<string> {
  try {
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-name",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });
    const result = cvToValue(cv);
    return result?.value || "Workshop Token";
  } catch (error) {
    console.error("Error fetching name:", error);
    return "Workshop Token";
  }
}

export async function getSymbol(): Promise<string> {
  try {
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-symbol",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });
    const result = cvToValue(cv);
    return result?.value || "WTK";
  } catch (error) {
    console.error("Error fetching symbol:", error);
    return "WTK";
  }
}

export async function getDecimals(): Promise<number> {
  try {
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-decimals",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });
    const result = cvToValue(cv);
    return Number(result?.value) || TOKEN_DECIMALS;
  } catch (error) {
    console.error("Error fetching decimals:", error);
    return TOKEN_DECIMALS;
  }
}

export async function getTotalSupply(): Promise<number> {
  try {
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-total-supply",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });
    const result = cvToValue(cv);
    return Number(result?.value) || 0;
  } catch (error) {
    console.error("Error fetching total supply:", error);
    return 0;
  }
}

export async function getBalance(address: string): Promise<number> {
  try {
    if (!address) return 0;
    
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-balance",
      functionArgs: [standardPrincipalCV(address)],
      senderAddress: address,
      network: NETWORK,
    });
    const result = cvToValue(cv);
    return Number(result?.value) || 0;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
}

/* -------------------------
   Transaction builders
   ------------------------- */
export function transferTokenTx(
  amount: number,
  fromAddress: string,
  toAddress: string,
  memo?: string
) {
  const memoArg = memo
    ? someCV(bufferCVFromString(memo))
    : noneCV();

  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "transfer",
    functionArgs: [
      uintCV(amount),
      standardPrincipalCV(fromAddress),
      standardPrincipalCV(toAddress),
      memoArg,
    ],
    network: NETWORK,
  };
}

export function mintTokenTx(amount: number, toAddress: string) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "mint",
    functionArgs: [uintCV(amount), standardPrincipalCV(toAddress)],
    network: NETWORK,
  };
}