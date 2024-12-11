import "../components/header.css";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";

const Header = ({
  visibleSign,
  setVisibleSign,
  visibleLog,
  setVisibleLog,
  token,
  setToken,
}) => {
  // const modalVisibility = () => {
  //   setVisible(!visible);
  // };

  return (
    <header>
      <nav className="container">
        <img src={logo} alt="logo vinted" />
        <form>
          <IoSearch className="icon-search" />
          <input
            className="search-bar"
            type="text"
            placeholder="Rechercher des articles"
          />
        </form>
        <div className="btn-container">
          {!token && (
            <div className="btn-subs-log-container">
              <button
                className="btn-subs-log"
                onClick={() => {
                  setVisibleSign(!visibleSign);
                }}
              >
                S'inscrire
              </button>
              <button
                className="btn-subs-log"
                onClick={() => {
                  setVisibleLog(!visibleLog);
                }}
              >
                Se connecter
              </button>
            </div>
          )}

          {token && (
            <button
              className="btn-disconnect"
              onClick={() => {
                setToken(null);
                Cookies.remove("token");
              }}
            >
              Se déconnecter
            </button>
          )}
          <div>
            <button className="btn-sell">Vends tes articles</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
