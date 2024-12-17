import "../components/modalLogin.css";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalLogin = ({
  setVisibleLog,
  setVisibleSign,
  setToken,
  redirectPath,
}) => {
  const [formData, setFormData] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  ///////// FONCTION QUAND ON REMPLIT L INPUT EMAIL //////////////////
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    const newFormData = { ...formData, email: value };
    setFormData(newFormData);
  };
  ////////////////////////////////////////

  ///////// FONCTION QUAND ON REMPLIT L INPUT PASSWORD //////////////////
  const handleChangePassword = (event) => {
    const value = event.target.value;
    const newFormData = { ...formData, password: value };
    setFormData(newFormData);
  };
  ////////////////////////////////////////

  /////// FONCTION A LA SOUMISSION DU FORMULAIRE /////////////////
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 60 });
      setToken(token);
      setVisibleLog(false);

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        setErrorMessage("Email et/ou mot de passe incorrect !");
      } else {
        setErrorMessage("Problème avec le serveur");
      }
    }
  };
  /////////////////////////////////////////////////////////
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisibleLog(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* button pour fermer la modal */}

        <button
          className="close-btn"
          onClick={() => {
            setVisibleLog(false);
          }}
        >
          X
        </button>
        <h2>Se Connecter</h2>
        <form className="form-signup-login" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChangePassword}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="btn-login">Se connecter</button>
          <p
            className="toSubs"
            onClick={() => {
              setVisibleLog(false);
              setVisibleSign(true);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
