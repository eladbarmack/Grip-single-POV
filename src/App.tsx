import React from "react";
import logo from "./logo.svg";
import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
import axios from "axios";
// import https from "https";

// const instance = axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//   }),
// });

function App() {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await axios.post(
          "https://localhost:9090/api/auth/oauth2_pov_callback",
          {
            code: codeResponse.code,
          }
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    redirect_uri: "http://localhost:9090/api/auth",
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}

        <button onClick={login}>Login</button>
      </header>
    </div>
  );
}

export default App;
