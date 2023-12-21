import React, { useState, useEffect } from "react";
import { OrderDetailsModal } from "@/components/shared/Modals";
import moment from "moment";
import MySubscription from "./my-subscription";
import { Fade } from "react-reveal";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const MyPurchaseHistory = ({ tabActive, orders, alertBox, subscriptionCompData }) => {
  const [previewData, setPreviewData] = useState(null);
  const [activeControl, setActiveControl] = useState("P");
  useEffect(() => {
    if (orders.length > 0) {
      setActiveControl("P");
    } else {
      setActiveControl("S");
    }
  }, []);

  const openModal = (data) => {
    setPreviewData(data);
    document.querySelector("body").classList.add("open-modal-order-details");
  };

  const getCurrencyType = (currency) => {
    const type = currency ? currency.toUpperCase() : "";
    switch (type) {
      case "INR":
        return "Rs.";
      case "GBP":
        return "£";
      case "EUR":
        return "€";
      default:
        return "$";
    }
  };

  return (
    <>
      <div style={{ display: tabActive ? "block" : "none" }} id="purchase-history">
        <div className="header-controls">
          {orders && orders.length > 0 && (
            <span
              className={`white-box ${activeControl === "P" && "active"}`}
              onClick={(e) => setActiveControl("P")}
            >
              Individual Courses
            </span>
          )}
          {subscriptionCompData && subscriptionCompData.userData && subscriptionCompData.userData.subscrptions && subscriptionCompData.userData.subscrptions.active_plans && subscriptionCompData.userData.subscrptions.active_plans.length > 0 && (
            <span
              className={`white-box ${activeControl === "S" && "active"}`}
              onClick={(e) => setActiveControl("S")}
            >
              Subscriptions
            </span>
          )}
          <style jsx>
            {`
              .header-controls {
                margin-bottom: 10px;
                max-width: 1330px;
                width: 100%;
                padding: 0 15px;
              }
              .header-controls span {
                font-size: 1.25em;
                color: #535b70;
                background: white;
                line-height: 25px;
                width: 200px;
                display: inline-block;
                padding: 9px;
                margin: 5px;
                cursor: pointer;
                text-align: center;
                transition: all 0.2s ease-in-out;
              }
              .header-controls span.active {
                font-weight: 500;
                background: #fff3ea;
                color: #f06421;
              }
              .header-controls span:first-child {
                margin-right: 1em;
              }
              @media (min-width: 1px) and (max-width: 640px) {
                .header-controls span {
                  font-size: 1em;
                  width: 150px;
                  padding: 5px;
                }
              }
            `}
          </style>
        </div>
        {orders && orders.length > 0 && activeControl === "P" && (
          <MyOrders
            orders={orders}
            openModal={openModal}
            previewData={previewData}
            setPreviewData={setPreviewData}
          />
        )}
        {subscriptionCompData && subscriptionCompData.userData && subscriptionCompData.userData.subscrptions && subscriptionCompData.userData.subscrptions.active_plans && subscriptionCompData.userData.subscrptions.active_plans.length > 0 &&
          activeControl === "S" && <MySubscription {...subscriptionCompData} />}

        {orders && orders.length === 0 && subscriptionCompData && subscriptionCompData.userData && subscriptionCompData.userData.subscrptions &&
          subscriptionCompData.userData.subscrptions.active_plans.length === 0 && <NoOrderFound />}

        <br />
      </div>
    </>
  );
};

const MyOrders = ({ orders, openModal, previewData, setPreviewData }) => {
  const [expanded, setExpanded] = useState("panel");
  const handleOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [modifiedOrderData, setModifiedOrderData] = useState([]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const output = [];

      orders.forEach((order) => {
        const orderDetails = order.order_details.reduce((acc, detail) => {
          const courseName = detail.course_details?.name;
          const existingCourse = acc.find((course) => course.name === courseName);

          if (existingCourse) {
            existingCourse.products.push({
              course_period: {
                start_date: detail.course_period.start_date,
                end_date: detail.course_period.end_date,
              },
              product_type: detail.product_type,
            });
          } else {
            acc.push({
              name: courseName,
              products: [
                {
                  course_period: {
                    start_date: detail.course_period.start_date,
                    end_date: detail.course_period.end_date,
                  },
                  product_type: detail.product_type,
                },
              ],
            });
          }

          return acc;
        }, []);

        output.push({
          id: order.id.toString(),
          originalOrder: order,
          order_details: orderDetails,
        });
      });

      setModifiedOrderData(output);
    }
  }, [orders]);

  return (
    <div className="container">
      <OrderDetailsModal data={previewData} setPreviewData={setPreviewData} />
      <div className="dashboard-subscription">
        <div className="white-box invoice-block">
          <div className="head-section-updated">Order Details</div>
          <div className="invoice-table-product">
            <div className="heading-product">
              <ul style={{ listStyle: "none" }}>
                <li>Order Id</li>
                <li>Purchased Date</li>
                <li>Invoice</li>
              </ul>
            </div>
            <div className="invoice-content">
              {modifiedOrderData?.map((order, idx) => {
                if (modifiedOrderData.length > 0) {
                  return (
                    <>
                      <Accordion
                        key={idx}
                        expanded={expanded === `panel` + idx}
                        onChange={handleOpen(`panel` + idx)}
                      >
                        <AccordionSummary
                          aria-controls={"panel1d-content" + idx}
                          id={"panel1d-header" + idx}
                          expandIcon={
                            expanded === "panel" + idx ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )
                          }
                          className="accordion"
                        >
                          <div className="product-summary">
                            <ul style={{ listStyle: "none" }}>
                              <li className="list-main">
                                <div data-label="Order ">{order.originalOrder?.id}</div>
                                <div data-label="Purchase Date">
                                  {moment(new Date(order.originalOrder.order_date)).format("ll")}
                                </div>
                                <div data-label="Invoice">
                                  {/* {order?.order_details.length - 1 === idx  && ( */}
                                  <a
                                    className="link-view"
                                    href="Javascript:void(0)"
                                    onClick={() => openModal(order.originalOrder)}
                                  >
                                    View
                                  </a>
                                  {/* )} */}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="product-details">
                            <div className="inner-heading">
                              <ul style={{ listStyle: "none" }}>
                                <li>Course Name</li>
                                <li>Product Type</li>
                                <li>Start Date</li>
                                <li>End Date</li>
                                <li>Status</li>
                              </ul>
                            </div>
                            {order.order_details.map((item, ix) => {
                              let date_exp = false;
                              if (item.products[0]?.course_period?.end_date) {
                                let endTime = new Date(item.products[0]?.course_period?.end_date);
                                endTime.setHours(0, 0, 0, 0);
                                let a = moment(endTime);
                                let b = moment(new Date());
                                let rem = a.diff(b, "days");
                                if (rem < 0) {
                                  date_exp = true;
                                }
                              }

                              return (
                                <div className="inner-content">
                                  <ul>
                                    <li className="content-list">
                                      <div data-label="Course Name" className="particular-div">
                                        {item.name}
                                      </div>
                                      <div data-label="Product Type" className="product-type">
                                        <div className="product-type-div">
                                          {item.products.map((tmpItem) => {
                                            return (
                                              //@ts-ignore
                                              <li type={"1"} className="particular-list">
                                                  {tmpItem.product_type === "PT" && "Practice Test"}
                                                  {tmpItem.product_type === "OC" && "Video Course"}
                                                  {tmpItem.product_type === "LAB" && "Hands On Lab"}
                                                  {tmpItem.product_type === "SANDBOX" &&
                                                    "Cloud Sandbox"}
                                                  {(tmpItem.product_type === "SANDBOX-1" ||
                                                    tmpItem.product_type === "SANDBOX-3" ||
                                                    tmpItem.product_type === "SANDBOX-6") &&
                                                    "Sandbox"}
                                              </li>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      <div data-label="Purchased Date">
                                        {item.products[0]?.course_period?.start_date
                                          ? moment(
                                              new Date(item.products[0]?.course_period?.start_date)
                                            ).format("ll")
                                          : "N/A"}
                                      </div>
                                      <div data-label="Expiry Date">
                                        {item.products[0]?.course_period?.end_date
                                          ? moment(
                                              new Date(item.products[0]?.course_period?.end_date)
                                            ).format("ll")
                                          : "Lifetime"}
                                      </div>

                                      <div
                                        data-label="Status"
                                        style={{
                                          color: date_exp ? "#FF0000" : "#00BE7E",
                                        }}
                                      >
                                        {/* {order?.order_status == "" ? "Expired" : "Active"} */}
                                        {date_exp ? "Expired" : "Active"}
                                      </div>
                                      {/* <div data-label="Amount">
                                              {order?.currency ? getCurrencyType(order?.currency) : ""}
                                              {order?.order_total?.toFixed(2)}
                                              <br />
                                                <span>
                                                  ({order?.order_details?.length || "0"}{" "}
                                                  {order?.order_details?.length > 1 ? "items" : "item"})
                                                </span>
                                              </div> */}
                                    </li>
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoOrderFound = () => (
  <div className="no-order-found white-box container">
    No Orders Found
    <style jsx>{`
      .no-order-found {
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        color: #aaa;
      }
    `}</style>
  </div>
);

export default MyPurchaseHistory;
