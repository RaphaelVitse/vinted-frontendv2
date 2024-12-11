import "../components/modalSignup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ModalSignup = ({ setVisibleSign, setVisibleLog, setToken }) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username,
        email,
        password,
        newsletter,
      });

      console.log(response.data);
      const token = response.data.token;
      console.log("le token est ", token);
      Cookies.set("token", token, { expires: 60 });
      setToken(token);
      setVisibleSign(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Missing parameters !") {
        setErrorMessage("Veuillez compléter tous les champs !");
      } else if (error.response.status === 409) {
        setErrorMessage("L'adresse mail saisie existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
    }
  };

  return (
    <div className="modal-root">
      <div className="modal-signup">
        {/* button pour fermer la modal */}
        <button
          className="close-btn"
          onClick={() => {
            setVisibleSign(false);
          }}
        >
          X
        </button>
        <h2>S'inscrire</h2>
        <form className="form-signup-login" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="newsletter-container">
            <div className="newsletter">
              <input
                className="checkbox"
                type="checkbox"
                name="newsletter"
                checked={newsletter}
                onChange={() => {
                  setNewsletter(!newsletter);
                }}
              />
              <p>S'inscrire à notre newlsetter</p>
            </div>
            <p className="inscription">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="btn-subs">S'inscrire</button>
          <p
            className="toLogin"
            onClick={() => {
              setVisibleSign(false);
              setVisibleLog(true);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalSignup;
