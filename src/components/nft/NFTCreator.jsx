import { useEffect, useRef, useState } from "react";
import IPFS from "ipfs";
import domToImage from "dom-to-image";
import { mintNFT } from "../../services/near";
import styles from "./NFTCreator.module.css";

export default function NFTCreator() {
  const [ipfs, setIpfs] = useState(null);

  // create a reference to the DOM node that represents the NFT we are creating
  const nft = useRef();

  const [bgColor, setBgColor] = useState("#000000");
  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [text, setText] = useState("NFT!");

  // when the component first mounts initialize an IPFS node
  // this will allow us to add the locally generated NFT to IPFS
  useEffect(() => {
    IPFS.create().then(setIpfs);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // convert the DOM node into an image
    // and store the image on chain
    // const blob = await domToImage.toPng(nft.current);
    // await mintNFT(blob);

    // convert the DOM node into an image
    const blob = await domToImage.toBlob(nft.current);

    // add the image to IPFS
    // here the cid (content identifier) is a unique id associated with the image
    const { cid } = await ipfs.add(blob);

    console.log(`See your NFT at https://dweb.link/ipfs/${cid.toString()}`);
    await mintNFT(cid.toString());
    window.location.reload();
  };

  if (!ipfs) return <h1>Loading...</h1>;

  return (
    <section className={styles.NFTCreator}>
      <form onSubmit={handleSubmit}>
        <h2>Create an NFT</h2>
        <input
          type="color"
          value={bgColor}
          onChange={({ target }) => setBgColor(target.value)}
        />
        <input
          type="color"
          value={fgColor}
          onChange={({ target }) => setFgColor(target.value)}
        />
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button>Create</button>
      </form>
      <section>
        <h2>Sample NFT</h2>
        <div
          ref={nft}
          style={{
            backgroundColor: bgColor,
            color: fgColor,
            width: "100px",
            height: "100px",
          }}
        >
          {text}
        </div>
      </section>
    </section>
  );
}
