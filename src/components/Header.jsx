import "../components/header.css";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";
import * as Switch from "@radix-ui/react-switch";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  visibleSign,
  setVisibleSign,
  visibleLog,
  setVisibleLog,
  token,
  setToken,
  title,
  setTitle,
  btnFilterAsc,
  setBtnFilterAsc,
}) => {
  // const modalVisibility = () => {
  //   setVisible(!visible);
  // };
  // console.log("etat de btnfilterprice depuis header", btnFilterAsc);
  const navigate = useNavigate();

  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div className="switch-search">
          <form>
            <IoSearch className="icon-search" />
            <input
              className="search-bar"
              type="text"
              placeholder="Rechercher des articles"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </form>
          <div className="switch-container">
            <label htmlFor="filter-switch" className="label">
              Tri croissant
            </label>
            <Switch.Root
              id="filter-switch"
              className="SwitchRoot"
              checked={btnFilterAsc}
              onCheckedChange={(checked) => setBtnFilterAsc(checked)}
            >
              <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
            <label htmlFor="filter-switch" className="label">
              Tri décroissant
            </label>
          </div>
        </div>

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

          <Link to="/offer/publish">
            <button
              className="btn-sell"
              onClick={() => {
                if (token) {
                  navigate("/offer/publish");
                } else {
                  setVisibleLog(!visibleLog);
                }
              }}
            >
              Vends tes articles
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
