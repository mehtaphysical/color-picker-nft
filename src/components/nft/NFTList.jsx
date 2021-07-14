import { useEffect, useState } from "react";
import { getNFTs, wallet } from "../../services/near";
import styles from "./NFTList.module.css";

export default function NFTList() {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getNFTs(wallet.getAccountId()).then(setNFTs);
  }, []);

  console.log(nfts);

  return (
    <section className={styles.NFTList}>
      <h2>{wallet.getAccountId()}'s NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <img src={`https://dweb.link/ipfs/${nft.id}`} alt={nft.id} />
        ))}
      </ul>
    </section>
  );
}
