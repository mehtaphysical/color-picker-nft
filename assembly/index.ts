import {
  Context,
  PersistentMap,
  PersistentSet,
  PersistentUnorderedMap,
  u128,
} from "near-sdk-as";

@nearBindgen
class Token {
  id: string;
  owner_id: string;
}

// PersistentMap -> dictionary (key/value pairs)
// PersistentSet -> a unique list
// PersistentUnorderedMap -> dictionary (key/value pairs) that can act like a list

export class Contract {
  // nftIdToOwnerId maps (CID from IPFS to Owner Account ID)
  nftIdToOwnerId: PersistentUnorderedMap<string, string> =
    new PersistentUnorderedMap<string, string>("o");

  ownerIdToNfts: PersistentMap<string, PersistentSet<string>> =
    new PersistentMap<string, PersistentSet<string>>("a");

  nft_mint(id: string): void {
    // make sure that someone doesn't already own it
    const exists = this.nftIdToOwnerId.contains(id);
    assert(!exists, "NFT already minted");

    // find a way to associate the id with an owner
    this.nftIdToOwnerId.set(id, Context.sender);

    // get the set of owned tokens
    let ownedTokens = this.ownerIdToNfts.get(Context.sender);

    // if the sender doesn't own any tokens yet, create a set
    if (!ownedTokens) {
      ownedTokens = new PersistentSet(Context.sender);
    }

    // add nft to set
    ownedTokens.add(id);

    // store set in map
    this.ownerIdToNfts.set(Context.sender, ownedTokens);
  }

  nft_tokens_for_owner(account_id: string): Token[] {
    const tokens: Token[] = [];
    // const nfts = this.nftIdToOwnerId.entries();
    const nftIds = this.ownerIdToNfts.getSome(account_id).values();

    for (let i = 0; i < nftIds.length; i++) {
      const id = nftIds[i];
      tokens.push({ id, owner_id: account_id });
    }

    return tokens;
  }
}
