import React, { useState, useEffect } from "react";
import "./App.css";

export default function MemeVault() {
  const [memes, setMemes] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  // Load saved memes on startup
  useEffect(() => {
    const saved = localStorage.getItem("rialo_memes_full");
    if (saved) {
      setMemes(JSON.parse(saved));
    }
  }, []);

  // Save all memes whenever updated
  useEffect(() => {
    localStorage.setItem("rialo_memes_full", JSON.stringify(memes));
  }, [memes]);

  const handleUpload = () => {
    if (!file) return alert("Please select an image first!");

    const reader = new FileReader();
    reader.onloadend = () => {
      const newMeme = {
        id: Date.now(),
        image: reader.result, // base64 data
        caption: caption || "No caption",
        minted: false,
        tokenId: memes.length + 101,
      };

      const updated = [newMeme, ...memes];
      setMemes(updated);
      localStorage.setItem("rialo_memes_full", JSON.stringify(updated));

      setFile(null);
      setCaption("");
      alert("✅ Meme uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleMint = (id) => {
    const updated = memes.map((m) =>
      m.id === id ? { ...m, minted: true } : m
    );
    setMemes(updated);
    localStorage.setItem("rialo_memes_full", JSON.stringify(updated));
    alert("✅ Meme minted to Rialo (demo mode)");
  };

  return (
    <main className="vault">
      <h1>🪙 Rialo Meme Vault</h1>
      <p>Upload • Share • Collect — Created by Osita</p>

      <section className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handleUpload}>Upload Meme</button>
      </section>

      <section className="gallery">
        {memes.length === 0 ? (
          <p>No memes yet — upload the first one!</p>
        ) : (
          memes.map((m) => (
            <div key={m.id} className="meme-card">
              <img src={m.image} alt={m.caption} />
              <div className="meme-caption">{m.caption}</div>
              <div className="meme-meta">
                {m.minted ? `Token #${m.tokenId}` : "Token #— (demo)"}
              </div>
              {!m.minted && (
                <button
                  className="mint-button"
                  onClick={() => handleMint(m.id)}
                >
                  Mint to Rialo
                </button>
              )}
            </div>
          ))
        )}
      </section>

      <footer>⚡ Powered by Rialo</footer>
    </main>
  );
}