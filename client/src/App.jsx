import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  PageNotFound,
  Landing,
  Faqs,
  WhoAreWe,
  GetStarted,
} from "./globals";
import "./App.scss";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useSigner } from "wagmi";
import BlockchainProvider from "./blockchain";

function App() {
  const { data: signer } = useSigner();
  const initializeStream = async () => {
    const loggedInUser = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const stream = await loggedInUser.initStream([CONSTANTS.STREAM.NOTIF]);
    stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
      console.log("streamed data", data);
    });
    stream.connect();
  };

  useEffect(() => {
    initializeStream();
  }, []);
  return (
    <>
      <BlockchainProvider />

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/getStarted" element={<GetStarted />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="/who-are-we" element={<WhoAreWe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
