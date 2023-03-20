import "../App.css";
import { useState } from "react";

const MyOrder = ({ orderData }) => {
  const [currentOrder, setCurrentOrder] = useState(0);

  return (
    <div className="myorder-page">
      <div className="order-form pt-4">
        <div className="title d-flex justify-content-center mb-5">
          <h4>My Tickets</h4>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-container p-4">
            <h5 className="mb-5">#Order ID. {orderData[currentOrder].id}</h5>
            <div className="d-grid gap-2">
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Full Name</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={orderData[currentOrder].full_name}
                    disabled
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Identity Number</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={orderData[currentOrder].identity_number}
                    disabled
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Phone Number</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={orderData[currentOrder].phone_number}
                    disabled
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Tourism Place</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={orderData[currentOrder].tourism_place}
                    disabled
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Visit Date</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={
                      orderData[currentOrder].visit_date
                        .toString()
                        .substring(8, 10) +
                      "-" +
                      orderData[currentOrder].visit_date
                        .toString()
                        .substring(5, 7) +
                      "-" +
                      orderData[currentOrder].visit_date
                        .toString()
                        .substring(0, 4)
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Number of Adult Visitor</label>
                </div>
                <div className="col w-100">
                  <input
                    className="form-control w-100"
                    type="text"
                    placeholder={orderData[currentOrder].adult_visitor}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="row d-flex align-items-center">
                  <div className="col-4">
                    <label>Number of Child Visitor</label>
                  </div>
                  <div className="col w-100">
                    <input
                      className="form-control w-100"
                      type="text"
                      placeholder={orderData[currentOrder].child_visitor}
                      disabled
                    />
                  </div>
                </div>
                <label className="form-detail">*Under 12 years old</label>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Ticket Price</label>
                </div>
                <div className="col">
                  {orderData[currentOrder].ticket_price}
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <label>Total Paid</label>
                </div>
                <div className="col">{orderData[currentOrder].total_price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="myorder-nav d-flex justify-content-center align-items-center mt-4">
        <button
          className={currentOrder != 0 ? "active" : ""}
          onClick={() => {
            currentOrder != 0
              ? setCurrentOrder(currentOrder - 1)
              : setCurrentOrder(currentOrder);
              window.scrollTo(0, 0);
          }}
        >
          Previous
        </button>
        <label className="mx-4">{currentOrder + 1}</label>
        <button
          className={orderData.length > currentOrder + 1 ? "active" : ""}
          onClick={() => {
            orderData.length > currentOrder + 1
              ? setCurrentOrder(currentOrder + 1)
              : setCurrentOrder(currentOrder);
              window.scrollTo(0, 0);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrder;
