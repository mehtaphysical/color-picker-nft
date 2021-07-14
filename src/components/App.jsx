import { CONTRACT_ID, wallet } from "../services/near";
import NFTCreator from "./nft/NFTCreator";
import NFTList from "./nft/NFTList";
import styles from "./App.module.css";

export default function App() {
  if (!wallet.isSignedIn())
    return (
      <button
        onClick={() =>
          wallet.requestSignIn({
            contractId: CONTRACT_ID,
          })
        }
      >
        Sign In
      </button>
    );

  return (
    <section className={styles.App}>
      <NFTCreator />
      <NFTList />
    </section>
  );
}
