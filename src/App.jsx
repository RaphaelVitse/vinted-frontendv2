import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

///// IMPORT PAGES //////////
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";

///// IMPORT COMPONENT /////////
import Header from "./components/Header";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [visibleSign, setVisibleSign] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [title, setTitle] = useState("");
  const [btnFilterAsc, setBtnFilterAsc] = useState(false);

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
          title={title}
          setTitle={setTitle}
          btnFilterAsc={btnFilterAsc}
          setBtnFilterAsc={setBtnFilterAsc}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                title={title}
                setTitle={setTitle}
                btnFilterAsc={btnFilterAsc}
                setBtnFilterAsc={setBtnFilterAsc}
              />
            }
          />
          <Route
            path="/offers/:id"
            element={
              <Offer
                token={token}
                visibleLog={visibleLog}
                setVisibleLog={setVisibleLog}
              />
            }
          />
          <Route path="/offer/publish" element={<Publish token={token} />} />
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
