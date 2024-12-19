import "../pages/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { TailSpin as Loader } from "react-loader-spinner";

const Home = ({ title, btnFilterAsc, token, setVisibleLog, visibleLog }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  // console.log("etat de btnfilterprice depuis home", btnFilterAsc);

  const totalResults = data.count;
  // console.log("totalresult", totalResults);
  const nbMaxpages = Math.ceil(totalResults / limit);
  // console.log("nbmax", nbMaxpages);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters = filters + "?title=" + title;
        }
        if (limit) {
          if (filters) {
            filters = filters + "& " + "limit=" + limit;
          } else {
            filters = "?limit=" + limit;
          }
        }
        if (currentPage) {
          if (filters) {
            filters = filters + "&" + "page=" + currentPage;
          } else {
            filters = "?page=" + currentPage;
          }
        }
        if (btnFilterAsc) {
          if (filters) {
            filters = filters + "&" + "sort=price-desc";
          } else {
            filters = "?sort=price-desc";
          }
        }
        const response = await axios.get(
          "https://site--backend-vinted-v2--2652jln5dkl6.code.run/" + filters
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [title, currentPage, btnFilterAsc]);

  return isLoading ? (
    <div className="home-loader">
      <Loader
        visible={true}
        height="80"
        width="80"
        color="#007783"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <main>
      <section className="title-img">
        <div className="container">
          <div className="title-home">
            <h1>Prêt à faire du tri dans vos placards ?</h1>
            <div>
              <button
                className="btn-start-sell"
                onClick={() => {
                  if (token) {
                    navigate("/offer/publish");
                  } else {
                    setVisibleLog(!visibleLog);
                  }
                }}
              >
                Commencer à vendre
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="offer-container container">
        {data.offers.map((offer) => {
          // console.log("offerID", offer._id);

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
                <div
                  onClick={() => {
                    navigate(`/offers/${offer._id}`, {
                      state: { from: location.pathname },
                    });
                  }}
                >
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
              </div>
            </section>
          );
        })}
      </section>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Page precedente
        </button>

        <button
          disabled={currentPage === nbMaxpages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Page suivante
        </button>
      </div>
    </main>
  );
};

export default Home;
