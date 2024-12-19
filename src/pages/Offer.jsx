import "../pages/offer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

const Offer = ({ token, visibleLog, setVisibleLog }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.from;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted-v2--2652jln5dkl6.code.run/${id}`
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <section className="container">
        {!data ? (
          <p>Aucune offre trouvée.</p>
        ) : (
          <div className="details-container">
            <GrPrevious
              onClick={() => {
                navigate(previousPage);
              }}
            />
            <div className="main-left">
              {data.product_pictures.length > 0 ? (
                data.product_pictures.map((offer, index) => {
                  return (
                    <div
                      className="carrousel"
                      key={data.product_pictures[index].asset_id}
                    >
                      <div>
                        <img
                          src={offer.secure_url}
                          alt="image du produit vendu"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                // <div>
                //   <img
                //     src={data.product_pictures[1].secure_url}
                //     alt="image du produit vendu"
                //   />
                // </div>
                // <div>
                //   <img
                //     src={data.product_pictures[2].secure_url}
                //     alt="image du produit vendu"
                //   />
                // </div>

                <div className="only-one-img">
                  <img src={data.product_image.secure_url} alt="" />
                </div>
              )}
            </div>

            <div className="main-right">
              <div className="product-details">
                <p className="price-offer">{data.product_price.toFixed(2)} €</p>
                <div className="main-descr-product">
                  <div className="left-descr-product">
                    {data.product_details.map((detail, index) => {
                      const keysInObj = Object.keys(detail);
                      const keyInObj = keysInObj[0];
                      return (
                        <div key={index}>
                          <p>{keyInObj}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="right-descr-product">
                    {data.product_details.map((detail, index) => {
                      const keysInObj = Object.keys(detail);
                      const keyInObj = keysInObj[0];
                      return (
                        <div key={index}>
                          <p>{detail[keyInObj]}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="product-name">{data.product_name}</p>
              <p className="details-descr">{data.product_description}</p>
              <div className="avatar-name">
                {data.owner.account.avatar && (
                  <p>
                    <img
                      className="avatar-for-descr"
                      src={data.owner.account.avatar.url}
                      alt="avatar"
                    />
                  </p>
                )}

                <p className=""> {data.owner.account.username}</p>
              </div>
              <button
                className="btn-buy"
                onClick={() => {
                  if (token) {
                    navigate("/payment", {
                      state: {
                        price: data.product_price,
                        name: data.product_name,
                      },
                    });
                    console.log("price =", data.product_price);
                  } else {
                    setVisibleLog(!visibleLog);
                    navigate("/payment", {
                      state: {
                        price: data.product_price,
                        name: data.product_name,
                      },
                    });
                  }
                }}
              >
                Acheter
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Offer;
