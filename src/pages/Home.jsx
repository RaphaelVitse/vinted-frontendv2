import "../pages/home.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/offers/");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <main>
      <section className="title-img">
        <div className="container">
          <div className="title-home">
            <h1>Prêt à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </section>
      <section className="offer-container container">
        {data.offers.map((offer) => {
          return (
            <section key={offer._id}>
              <div className="offer-card">
                <div className="user-card">
                  {offer.owner.account.avatar && (
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.url}
                      alt="avatar"
                    />
                  )}
                  <p className="username"> {offer.owner.account.username}</p>
                </div>
                <div>
                  <img
                    className="product-img"
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </div>
                <div className="description-offer">
                  <p className="price"> {offer.product_price} €</p>
                  {offer.product_details.map((details, index) => {
                    return (
                      <div key={index}>
                        <p className="offer-size-brand">{details.TAILLE}</p>
                      </div>
                    );
                  })}
                  {offer.product_details.map((details, index) => {
                    return (
                      <div key={index}>
                        <p className="offer-size-brand">{details.MARQUE}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
