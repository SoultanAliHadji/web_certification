import "../App.css";
import Landing from "./Landing";
import MyOrder from "./MyOrder";
import axios from "axios";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [orderData, setOrderData] = useState([{}]);
  const [submitData, setSubmitData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentPage, submitData]);

  return (
    <div>
      <div className="navigation-bar">
        <nav class="navbar navbar-expand-lg bg-light fixed-top">
          <div class="container">
            <a
              class="navbar-brand"
              onClick={() => {
                setCurrentPage("landing");
                window.scrollTo(0, 0);
              }}
            >
              TRAVELSPOT.ID
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto d-flex align-items-center gap-md-4">
                <a
                  class={
                    "nav-link" + (currentPage == "landing" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentPage("landing");
                    window.scrollTo(0, 0);
                  }}
                >
                  Home
                </a>
                <a
                  class={
                    "nav-link" +
                    (orderData == 0
                      ? " dissable"
                      : currentPage == "my-order"
                      ? " active"
                      : "")
                  }
                  onClick={() => {
                    setCurrentPage("my-order");
                    window.scrollTo(0, 0);
                  }}
                >
                  My Order
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div>
        {currentPage == "landing" ? (
          <Landing setSubmitData={setSubmitData}/>
        ) : (
          <MyOrder orderData={orderData} />
        )}
      </div>
      <div className="footer mt-5">
        <div className="d-flex justify-content-center">
          <label className="my-2">
            ©Copyright by Soultan Ali Hadji (19102265)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
