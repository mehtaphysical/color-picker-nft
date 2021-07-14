import { Context, PersistentMap, PersistentSet } from "near-sdk-as";

@nearBindgen
class Token {
  id: string;
  owner_id: string;
}

export class Contract {
  private nfts: PersistentMap<string, PersistentSet<string>> =
    new PersistentMap("o");

  nft_mint(id: string): void {
    let ownedNfts = this.nfts.get(Context.sender);
    if (!ownedNfts) ownedNfts = new PersistentSet(Context.sender);

    ownedNfts.add(id);

    this.nfts.set(Context.sender, ownedNfts);
  }

  nft_tokens_for_owner(account_id: string): Token[] {
    const tokens: Token[] = [];
    const ids = this.nfts.getSome(account_id).values();

    for (let i = 0; i < ids.length; i++) {
      tokens.push({ id: ids[i], owner_id: account_id });
    }

    return tokens;
  }
}
