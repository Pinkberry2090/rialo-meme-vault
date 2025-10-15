import React from "react";
import "./App.css";
import logo from "./rialo-logo.png";

function App() {
  return (
    <div className="app-container">
      <img src={logo} alt="Rialo Logo" className="logo" />
      <h1>Welcome to the Rialo Meme Vault 🚀</h1>
      <p>Building trust through transparency and community.</p>

      <div className="signature">Created by Osita 🖋</div>
      <div className="powered-by">⚡ Powered by Rialo ⚡</div>
    </div>
  );
}

export default App;