export function abbreviateAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
}

export function abbreviateTxnId(txnId: string) {
  return `${txnId.substring(0, 5)}...${txnId.substring(txnId.length - 4)}`;
}

export function explorerAddress(address: string) {
  return `https://explorer.hiro.so/address/${address}?chain=testnet`;
}

export function formatToken(amount: number, decimals = 6) {
  return parseFloat((amount / 10 ** decimals).toFixed(decimals));
}

export function parseToken(amount: number, decimals = 6) {
  return amount * 10 ** decimals;
}
