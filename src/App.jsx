import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

///// IMPORT PAGES //////////
import Home from "./pages/Home";

///// IMPORT COMPONENT /////////
import Header from "./components/Header";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [visibleSign, setVisibleSign] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);

  return (
    <>
      <Router>
        <Header
          visibleSign={visibleSign}
          setVisibleSign={setVisibleSign}
          visibleLog={visibleLog}
          setVisibleLog={setVisibleLog}
          token={token}
          setToken={setToken}
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {visibleSign && (
          <ModalSignup
            setVisibleSign={setVisibleSign}
            setVisibleLog={setVisibleLog}
            setToken={setToken}
          />
        )}
        {visibleLog && (
          <ModalLogin
            setVisibleLog={setVisibleLog}
            setVisibleSign={setVisibleSign}
            setToken={setToken}
          />
        )}
      </Router>
    </>
  );
}

export default App;
