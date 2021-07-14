import { keyStores, Near, WalletConnection } from "near-api-js";

export const CONTRACT_ID = "dev-1626277293718-62024919370766";

const near = new Near({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
});

export const wallet = new WalletConnection(near, "color-picker-nft");

export const mintNFT = (id) => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "nft_mint",
    args: { id },
    gas: "300000000000000",
  });
};

export const getNFTs = (accountId) => {
  return wallet.account().viewFunction(CONTRACT_ID, "nft_tokens_for_owner", {
    account_id: accountId,
  });
};
