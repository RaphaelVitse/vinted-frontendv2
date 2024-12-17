import "../pages/publish.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedWearRate, setSelectedWearRate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [acceptedExchange, setAcceptedExchange] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("picture", file[i]);
      }
      //   formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", selectedWearRate);
      formData.append("city", city);
      formData.append("brand", selectedBrand);
      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + token, // il faut un token pour se connecter
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        console.log("id de mon annonce :", response.data._id);

        navigate(`/offers/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "une erreur est survenue, merci de réessayer !"
      );
    }
  };

  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            {preview.length > 0 ? (
              <div className="dashed-preview-image">
                {preview.map((img, index) => (
                  <div key={index} className="image-preview">
                    <img src={img} alt={`preview-${index}`} />
                    <div
                      className="remove-img-button"
                      onClick={() => {
                        const newPreview = [...preview];
                        const newFiles = [...file];
                        newPreview.splice(index, 1);
                        newFiles.splice(index, 1);
                        setPreview(newPreview);
                        setFile(newFiles);
                      }}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashed-preview-without">
                <div className="input-design-default">
                  <label htmlFor="file" className="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajouter une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    multiple
                    onChange={(event) => {
                      const files = Array.from(event.target.files); // Convertit FileList en tableau
                      setFile(files); // Met à jour le state avec plusieurs fichiers
                      setPreview(
                        files.map((file) => URL.createObjectURL(file))
                      ); // Génère des aperçus pour chaque fichier
                    }}
                    //   setFile(event.target.files[0]);
                    //   setPreview(URL.createObjectURL(event.target.files[0]));
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                rows="5"
                cols="75"
                value={description}
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                id="selectedBrand"
                name="selectedBrand"
                placeholder="ex: Zara"
                value={selectedBrand}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedBrand(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                id="selectedSize"
                name="selectedSize"
                placeholder="ex: L / 40 / 12"
                value={selectedSize}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedSize(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  const value = event.target.value;
                  setColor(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Etat</h4>
              <input
                name="wearRate"
                id="wearRate"
                placeholder="Neuf avec étiquette"
                value={selectedWearRate}
                onChange={(event) => setSelectedWearRate(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPrice(value);
                  }}
                />
                <div className="checkbox-input">
                  {acceptedExchange ? (
                    <label
                      htmlFor="exchange"
                      className="checkbox-design-checked"
                    ></label>
                  ) : (
                    <label
                      htmlFor="exchange"
                      className="checkbox-design"
                    ></label>
                  )}
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value={acceptedExchange}
                    onChange={() => setAcceptedExchange(!acceptedExchange)}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button-div">
            <button type="submit" className="form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromPublish: true }} />
  );
};

export default Publish;
