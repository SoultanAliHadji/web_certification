import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Landing = ({ setSubmitData }) => {
  const [profileVideo, setProfileVIdeo] = useState();
  const [checkBox, setCheckBox] = useState(false);
  const [currentObject, setCUrrentObject] = useState(0);
  const [objectArrStart, setObjectArrStart] = useState(0);
  const [objectArrEnd, setObjectArrEnd] = useState(4);
  const [formData, setFormData] = useState([
    "",
    null,
    "",
    "",
    "",
    null,
    null,
    "Rp0",
    "Rp0",
  ]);

  const objectArray = [
    {
      id: 1,
      name: "Bangkirai Hill",
      image: require("../assets/tourismImg1.jpg"),
      video: "https://www.youtube.com/embed/-7t3pm43Pxg?rel=0",
      price: "Rp35,000",
    },
    {
      id: 2,
      name: "Graha Indah Mangrove Center",
      image: require("../assets/tourismImg2.jpg"),
      video: "https://www.youtube.com/embed/oClpHCVpApk?rel=0",
      price: "Rp10,000",
    },
    {
      id: 3,
      name: "Manggar Reservoir",
      image: require("../assets/tourismImg3.jpg"),
      video: "https://www.youtube.com/embed/VfzRGv3ML0I?rel=0",
      price: "Rp20,000",
    },
    {
      id: 4,
      name: "Kemala Beach",
      image: require("../assets/tourismImg4.jpg"),
      video: "https://www.youtube.com/embed/Xayu__U-Q1I?rel=0",
      price: "Rp10,000",
    },
  ];

  const handleVideo = () => {
    setProfileVIdeo();
  };

  const handleNextButton = () => {
    setObjectArrStart(objectArrStart + 4);
    setObjectArrEnd(objectArrEnd + 4);
    setCUrrentObject(currentObject + 1);
  };

  const handlePreviousButton = () => {
    setObjectArrStart(objectArrStart - 4);
    setObjectArrEnd(objectArrEnd - 4);
    setCUrrentObject(currentObject - 1);
  };

  const handleFormData = (index, e) => {
    const newArray = [...formData];
    newArray[index] = e.target.value;
    setFormData(newArray);
  };

  const handlePostData = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/orders",
      data: {
        full_name: formData[0],
        identity_number: formData[1],
        phone_number: formData[2],
        tourism_place: formData[3],
        visit_date: new Date(
          formData[4].substring(6, 10) +
            "-" +
            formData[4].substring(3, 5) +
            "-" +
            formData[4].substring(0, 2)
        ),
        adult_visitor: formData[5],
        child_visitor: formData[6],
        ticket_price: formData[7],
        total_price: formData[8],
      },
    })
      .then((data) => {
        console.log(data);
        alert("Order Success");
      })
      .catch((err) => {
        console.log(err);
        alert("Order Failed");
      });
  };

  useEffect(() => {
    const newArray = [...formData];
    for (const i in objectArray) {
      if (objectArray[i].name == formData[3]) {
        newArray[7] = objectArray[i].price;
        newArray[8] =
          "Rp" +
          Intl.NumberFormat()
            .format(
              parseInt(
                objectArray[i].price
                  .substring(2, objectArray[i].price.length)
                  .split(",")
                  .join("") *
                  formData[5] +
                  objectArray[i].price
                    .substring(2, objectArray[i].price.length)
                    .split(",")
                    .join("") *
                    formData[6] *
                    0.5
              )
            )
            .toString();
      }
      if (formData[3] == "") {
        newArray[7] = "Rp0";
        newArray[8] = "Rp0";
      }
    }
    setFormData(newArray);
  }, [formData[3], formData[5], formData[6]]);

  const priceArr = objectArray.map((data) => {
    return (
      <tr>
        <th className="text-center" scope="row">
          {data.id}
        </th>
        <td>{data.name}</td>
        <td className="text-center">{data.price}</td>
      </tr>
    );
  });

  const tourismArr = objectArray
    .slice(objectArrStart, objectArrEnd)
    .map((data) => {
      return (
        <div className="col-3">
          <div className="d-flex justify-content-center">
            <div
              className="object-item"
              data-bs-toggle="modal"
              data-bs-target="#videoProfile"
              onClick={() => {
                setProfileVIdeo(data.video);
              }}
            >
              <img src={data.image} alt="" />
              <div className="d-flex justify-content-center">
                <label className="my-2">{data.name}</label>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="landing-page">
      <div className="container">
        <div className="hero">
          <div className="row w-100 h-100">
            <div className="col d-flex align-items-center ps-5">
              <div>
                <div>
                  <h1 className="hero-text">TRAVEL</h1>
                  <h4 className="hero-text">TO YOUR DREAM PLACES</h4>
                  <h4 className="hero-text mb-4">FAST AND EASILY NOW!</h4>
                </div>
                <a href="#tourism-object">
                  <button className="mt-5">Start Journey</button>
                </a>
              </div>
            </div>
            <div className="col d-flex justify-content-end align-items-center pe-5">
              <img src={require("../assets/landingHero.png")} alt="" />
            </div>
          </div>
        </div>
        <div className="tourism pt-5 mb-5" id="tourism-object">
          <div className="title d-flex justify-content-center pt-4 mb-5">
            <h4>Tourism Objects</h4>
          </div>
          <div className="pricing d-flex justify-content-end mb-3">
            <button
              type="button"
              className="pricing-button"
              data-bs-toggle="modal"
              data-bs-target="#priceList"
            >
              See Price List
            </button>
            <div
              className="modal fade"
              id="priceList"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <h5 className="mb-4">Pricing Table</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr className="text-center">
                          <th scope="col">#</th>
                          <th scope="col">Tourism Place Name</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>{priceArr}</tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="object">
            <div className="row mb-5">
              {tourismArr}
              <div
                className="modal fade"
                id="videoProfile"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body d-flex justify-content-center">
                      <iframe
                        width="460"
                        height="258"
                        src={profileVideo}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          handleVideo();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="object-nav d-flex justify-content-center align-items-center mb-4">
              <button
                className={objectArrStart != 0 ? "active" : ""}
                onClick={() => {
                  objectArrStart != 0
                    ? handlePreviousButton()
                    : setObjectArrStart(objectArrStart);
                }}
              >
                Previous
              </button>
              <label className="mx-4">{currentObject + 1}</label>
              <button
                className={objectArray.length > objectArrEnd ? "active" : ""}
                onClick={() => {
                  objectArray.length > objectArrEnd
                    ? handleNextButton()
                    : setObjectArrEnd(objectArrEnd);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="order-form pt-5">
          <div className="title d-flex justify-content-center mb-5">
            <h4>Book A Ticket</h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-container p-4">
              <h5 className="mb-5">Order Form</h5>
              <div className="d-grid gap-2">
                <div className="row d-flex align-items-center">
                  <div className="col-4">
                    <label>Full Name</label>
                  </div>
                  <div className="col w-100">
                    <input
                      className="form-control w-100"
                      type="text"
                      value={formData[0]}
                      onChange={(e) => {
                        handleFormData(0, e);
                      }}
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
                      value={formData[1] == null ? "" : formData[1]}
                      onChange={(e) => {
                        handleFormData(1, e);
                      }}
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
                      value={formData[2]}
                      onChange={(e) => {
                        handleFormData(2, e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="row d-flex align-items-center">
                    <div className="col-4">
                      <label>Tourism Place</label>
                    </div>
                    <div className="col w-100">
                      <select
                        className="form-select"
                        id="inputGroupSelect01"
                        value={formData[3]}
                        onChange={(e) => {
                          handleFormData(3, e);
                        }}
                      >
                        <option value="" selected>
                          Choose Tourism Place
                        </option>
                        {objectArray.map((data) => {
                          return <option>{data.name}</option>;
                        })}
                      </select>
                    </div>
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
                      value={formData[4]}
                      onChange={(e) => {
                        handleFormData(4, e);
                      }}
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
                      value={formData[5] == null ? "" : formData[5]}
                      onChange={(e) => {
                        handleFormData(5, e);
                      }}
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
                        value={formData[6] == null ? "" : formData[6]}
                        onChange={(e) => {
                          handleFormData(6, e);
                        }}
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
                    <label>
                      {formData[3] == ""
                        ? formData[7]
                        : objectArray.map((data) => {
                            if (data.name == formData[3]) {
                              return data.price;
                            }
                          })}
                    </label>
                  </div>
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col-4">
                    <label>Total Need to Pay</label>
                  </div>
                  <div className="col">
                    <label>
                      {formData[3] == ""
                        ? formData[8]
                        : objectArray.map((data) => {
                            if (data.name == formData[3]) {
                              return (
                                "Rp" +
                                Intl.NumberFormat()
                                  .format(
                                    parseInt(
                                      data.price
                                        .substring(2, data.price.length)
                                        .split(",")
                                        .join("") *
                                        formData[5] +
                                        data.price
                                          .substring(2, data.price.length)
                                          .split(",")
                                          .join("") *
                                          formData[6] *
                                          0.5
                                    )
                                  )
                                  .toString()
                              );
                            }
                          })}
                    </label>
                  </div>
                </div>
                <div className="terms-conditions d-flex align-items-center mt-3">
                  <input
                    className="me-3"
                    value={checkBox}
                    type="checkbox"
                    onClick={() => {
                      checkBox == false
                        ? setCheckBox(true)
                        : setCheckBox(false);
                    }}
                  />
                  <label className="text-justify">
                    I and/or my team have read, understood, and accepted the
                    terms and conditions which have been determined.
                  </label>
                </div>
                <div className="order-confirmation mt-5">
                  <div className="d-flex justify-content-center">
                    <div>
                      <button
                        className={
                          formData[0] == "" ||
                          formData[1] == null ||
                          formData[2] == "" ||
                          formData[3] == "" ||
                          formData[4] == "" ||
                          formData[5] == null ||
                          formData[6] == null ||
                          checkBox == false
                            ? "dissable"
                            : ""
                        }
                        onClick={() => {
                          handlePostData();
                          setFormData([
                            "",
                            null,
                            "",
                            "",
                            "",
                            null,
                            null,
                            "Rp0",
                            "Rp0",
                          ]);
                          setSubmitData(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Order Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
