import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  SubscriptionOrderDetailsModal,
  SubscriptionAutoRenewModal,
  SubscriptionCancelModal,
} from "./Modals";
import axios from "axios";
import { FormControlLabel, Switch } from "@material-ui/core";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MySubscription = ({
  tabActive,
  profile: userSubs,
  userData,
  subscriptionData,
  alertBox,
  subChangeAction,
}) => {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [planIsAutoRenew, setPlanIsAutoRenew] = useState(false);
  const [subsOrderData, setSubsOrderData] = useState(null);
  const [cancelSubs, setCancelSubs] = useState(true);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  // const [higherPlan, setHigherPlan] = useState([])
  // userSubs.active_plans.sort((a,b)=>(b.id-a.id))
  userSubs.active_plans.sort((a, b) => +new Date(b.order_date) - +new Date(a.order_date));
  // console.log(userSubs, "usersubs")
  // Sorting Subscription Plans Default Data
  subscriptionData.sort((a, b) => (a.subscription_for < b.subscription_for ? -1 : 1));
  useEffect(() => {
    let temActivePlan: any = null;
    let data_store = null
    if(userSubs.active_plans.length > 0)
    {
      let index = userSubs.active_plans.findIndex((itm)=> itm.is_plan_active && itm.plan.is_sandbox_access && itm.plan.is_unlimited_access_lab)
      if(index != -1)
      {
        temActivePlan = userSubs.active_plans[index];
        setCurrentPlan(temActivePlan)
        let renew = temActivePlan?.is_cancelled || temActivePlan?.type?.toLowerCase() === "manual" ? false : true
        setPlanIsAutoRenew(renew)
      }
      else{
        index = userSubs.active_plans.findIndex((itm)=> itm.is_plan_active && !itm.plan.is_sandbox_access && itm.plan.is_unlimited_access_lab)
        if(index != -1)
        {
          temActivePlan = userSubs.active_plans[index];
          setCurrentPlan(temActivePlan)
          let renew = temActivePlan?.is_cancelled || temActivePlan?.type?.toLowerCase() === "manual" ? false : true
          setPlanIsAutoRenew(renew)
        }
        else{
          index = userSubs.active_plans.findIndex((itm)=> itm.is_plan_active && !itm.plan.is_sandbox_access && !itm.plan.is_unlimited_access_lab)
          if(index != -1)
          {
            temActivePlan = userSubs.active_plans[index];
            setCurrentPlan(temActivePlan)
            let renew = temActivePlan?.is_cancelled || temActivePlan?.type?.toLowerCase() === "manual" ? false : true
            setPlanIsAutoRenew(renew)
          }
        }
      }
    }
    let finalSubDatas = [];
    // data?.is_cancelled || data?.type?.toLowerCase() === "manual" ? false : true
    if (temActivePlan && temActivePlan?.plan_id) {
      for (var i = 0; i < subscriptionData.length; i++) {
        if (
          temActivePlan?.plan_id == subscriptionData[i]?.id ||
          temActivePlan?.plan?.subscription_for == subscriptionData[i]?.subscription_for
        ) {
          finalSubDatas.push(subscriptionData[i]);
        } else {
          if (finalSubDatas.length > 0) {
            finalSubDatas.push(subscriptionData[i]);
            break;
          }
        }
      }
    }

    if (finalSubDatas.length == 0) {
      finalSubDatas = [];
      for (var i = 0; i < subscriptionData.length; i++) {
        if (i <= 1) {
          finalSubDatas.push(subscriptionData[i]);
        } else {
          break;
        }
      }
    }

    setSubscriptionPlans(finalSubDatas);
  }, [currentPlan]);

  useEffect(() => {
    if (currentPlan && currentPlan.refundData && currentPlan.refundData.status == "requested") {
      setCancelSubs(false);
    }
  }, [currentPlan]);


  //
  const [renewDisabled, setRenewDisabled]=useState(false);
  const openAutoRenewSubsModal = (e) => {
    e.preventDefault();
    document.body.classList.add("open-modal-auto-renew");
  };
  const handleAutoRenew = async (disableReason) => {
    if (disableReason) {      
      const response = await axios.post(baseUrl + "/subscription/auto_renew", {
        subs_id: currentPlan.id,
        auto_renew: false,
        disableReason: disableReason,
      });
      if (response.data && response.data.status && response.data.status == 1) {
        setRenewDisabled(true);
        document.body.classList.remove("open-modal-auto-renew");
        setPlanIsAutoRenew(false);
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: currentPlan.is_cancelled ? "Auto renew Enabled" : "Auto renew disabled",
        });
      }
    }
  };

  const openCancelSubsModal = () => document.body.classList.add("open-modal-cancel-subscription");
  const handleSubscriptionCancel = async (reason) => {
    // HANDEL SUBS CANCEL
    if (currentPlan && currentPlan.id && reason) {
      const response: any = await axios.post(baseUrl + "/subscription/cancel", {
        subs_id: currentPlan.id,
        user_id: userData?.id || "",
        user_reason_msg: reason,
      });
      document.body.classList.remove("open-modal-cancel-subscription");
      if (response.data && response.data.status && response.data.status == 1) {
        setCancelSubs(false);
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: response?.data?.msg,
        });
      }
    }
  };

  const handleSubscriptionChange = (data) => {
    subChangeAction(data); // add datas to state
    router.push("/pricing/checkout");
  };

  const openOrderDetailModal = (e, item) => {
    e.preventDefault();
    setSubsOrderData(item);
    document.querySelector("body").classList.add("open-modal-order-details");
  };

  const renewDate = moment(new Date(currentPlan?.end_date)).subtract(90, "days").format("ll");
  const expiryDate = moment(new Date()).format("ll");

  return (
    <>
      <SubscriptionAutoRenewModal handleAutoRenew={(disableReason) => handleAutoRenew(disableReason)} />
      <SubscriptionCancelModal handleSubCancel={handleSubscriptionCancel} />
      <SubscriptionOrderDetailsModal data={subsOrderData} setSubsOrderData={setSubsOrderData} />
      <div className="container">
        <div className="dashboard-subscription">
          <div className="white-box currunt-subscription">
            <div className="head-section">
              {currentPlan === null ||
              (currentPlan?.plan?.title?.includes("Annual") &&
                Date.parse(expiryDate) >= Date.parse(renewDate))
                ? "Renew Subscription"
                : currentPlan?.plan?.title?.includes("Years") &&
                  Date.parse(expiryDate) >= Date.parse(renewDate)
                ? "Renew Subscription"
                : "Current Subscription"}
            </div>
            <div className="box-content">
              {currentPlan === null ? (
                ""
              ) : (
                <div className="top-content">
                  {currentPlan?.type?.toLowerCase() === "automatic" ? (
                    <div className="currunt-plan">
                      {currentPlan?.plan?.title?.includes("Amazon") ? (
                        currentPlan.order_total > 0 ? (
                          <span>Premium+ (1 Year) - Amazon Employees</span>
                        ) : (
                          <span>Free 6 Months AWS Subscription</span>
                        )
                      ) : currentPlan?.plan?.title?.includes("Years") ||
                        currentPlan?.plan?.title?.includes("Months") ||
                        currentPlan?.plan?.title?.includes("Annual") ? (
                        <span>{currentPlan?.plan?.title} (Old Plan)</span>
                      ) : currentPlan?.plan?.title?.includes("Lifetime") ? (
                        <span>{currentPlan?.plan?.title}</span>
                      ) : (
                        <span>
                          {currentPlan?.plan?.title} ({"$"}
                          {currentPlan?.order_total}) &nbsp;
                        </span>
                      )}
                      {currentPlan?.plan?.description?.includes("Practice Test") ? (
                        <span className="includes">
                          Includes ({currentPlan?.plan?.description})
                        </span>
                      ) : currentPlan?.plan?.title?.includes("Amazon") ? (
                        currentPlan.order_total > 0 ? (
                          <span className="includes">
                            Includes (Practice Tests, Video Courses, Hands-On-Labs, Sandbox)
                          </span>
                        ) : (
                          <>
                            <span className="includes">
                              Includes (All AWS Courses - Practice Tests, Videos)
                            </span>
                          </>
                        )
                      ) : currentPlan?.plan?.title?.includes("Annual") &&
                        Date.parse(expiryDate) >= Date.parse(renewDate) ? (
                        <span className="includes"></span>
                      ) : currentPlan?.plan?.title?.includes("Years") &&
                        Date.parse(expiryDate) >= Date.parse(renewDate) ? (
                        <span className="includes"></span>
                      ) : (
                        <span className="includes">
                          Includes (Practice Tests, Video Courses, Hands-On-Labs)
                        </span>
                      )}
                      {currentPlan?.end_date ? (
                        <p>
                          {planIsAutoRenew ? "Next renewal on" : "Expires on"}{" "}
                          <strong>{moment(new Date(currentPlan?.end_date)).format("ll")}</strong>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="currunt-plan">
                        {currentPlan?.plan?.title?.includes("Amazon") ? (
                          <span>Free 6 Months AWS Subscription</span>
                        ) : currentPlan?.plan?.title?.includes("Years") ||
                          currentPlan?.plan?.title?.includes("Months") ||
                          currentPlan?.plan?.title?.includes("Annual") ? (
                          <span>{currentPlan?.plan?.title} (Old Plan)</span>
                        ) : currentPlan?.plan?.title?.includes("Lifetime") ? (
                          <span>{currentPlan?.plan?.title}</span>
                        ) : (
                          <span>
                            {currentPlan?.plan?.title} ({"$"}
                            {currentPlan?.plan?.offer_price?.usd}) &nbsp;
                          </span>
                        )}
                        {currentPlan?.plan?.description?.includes("Practice Test") ? (
                          <span className="includes">
                            Includes ({currentPlan?.plan?.description})
                          </span>
                        ) : currentPlan?.plan?.title?.includes("Amazon") ? (
                          <span className="includes">
                            Includes (All AWS Courses - Practice Tests, Videos)
                          </span>
                        ) : currentPlan?.plan?.title?.includes("Annual") &&
                          Date.parse(expiryDate) >= Date.parse(renewDate) ? (
                          <span className="includes"></span>
                        ) : currentPlan?.plan?.title?.includes("Years") &&
                          Date.parse(expiryDate) >= Date.parse(renewDate) ? (
                          <span className="includes"></span>
                        ) : (
                          <span className="includes">
                            Includes (Practice Tests, Video Courses, Hands-On-Labs)
                          </span>
                        )}
                        {currentPlan?.end_date ? (
                          <p>
                            {planIsAutoRenew ? "Next renewal on" : "Expires on"}{" "}
                            <strong>{moment(new Date(currentPlan?.end_date)).format("ll")}</strong>
                          </p>
                        ) : (
                          <p>
                            <strong>Life time access</strong>
                          </p>
                        )}
                      </div>
                    </>
                  )}

                    <div className="renewCancel-block">
                      {/* {!planIsAutoRenew ? "" :
                        <div className={!planIsAutoRenew ? "toggle-btn desabled" : "toggle-btn"}>
                          <span>Auto Renew</span>
                          <label className="switch" htmlFor="checkbox">
                            <input
                              type="checkbox"
                              id="checkbox"
                              defaultChecked={planIsAutoRenew}
                              onChange={openAutoRenewSubsModal}
                            />
                            <div className="slider round"></div>
                          </label>

                        </div>

                      } */}
                      {planIsAutoRenew ? 
                      <div>
                        <FormControlLabel control={<div><Switch checked={!renewDisabled} onClick={openAutoRenewSubsModal} /></div>} label='Auto Renew' />
                      </div> : ''}
                    {/* {currentPlan && currentPlan?.is_plan_active && cancelSubs && (
                      <span
                        onClick={openCancelSubsModal}
                        className="btn-cancelSubscription"
                        style={{ cursor: "pointer" }}
                      >
                        Cancel Subscription
                      </span>
                    )} */}

                    {!cancelSubs && <p>Refund request in progress</p>}
                  </div>
                </div>
              )}

              <div className="plans-block">
                <div className="block-group">
                  <div className="block-100">
                    {(currentPlan?.plan?.is_unlimited_access_lab &&
                      currentPlan?.plan?.is_sandbox_access) ||
                    currentPlan?.plan?.title?.includes("Lifetime") ? (
                      <div className="content">
                        Please share your experience with us
                        <a href="/reviews" className="btn btn-upgrade">
                          Review Now
                        </a>
                      </div>
                    ) : currentPlan?.plan?.title?.includes("Years") ||
                      (currentPlan?.plan?.title?.includes("Annual") &&
                        Date.parse(expiryDate) <= Date.parse(renewDate)) ? (
                      <div className="content">
                        Please share your experience with us
                        <a href="/reviews" className="btn btn-upgrade">
                          Review Now
                        </a>
                      </div>
                    ) : currentPlan === null ||
                      currentPlan?.plan?.title?.includes("Years") ||
                      (currentPlan?.plan?.title?.includes("Annual") &&
                        Date.parse(expiryDate) >= Date.parse(renewDate)) ? (
                      <div className="content">
                        Renew to Premium Plus today to get unlimited access to all of our Practice
                        Tests, Videos, Hands-On-Labs, and Sandboxes!
                        <a href="/pricing" className="btn btn-upgrade">
                          Renew
                        </a>
                      </div>
                    ) : (currentPlan?.plan?.is_unlimited_access_lab &&
                        !currentPlan?.plan?.is_sandbox_access) ||
                      (!currentPlan?.plan?.is_unlimited_access_lab &&
                        !currentPlan?.plan?.is_sandbox_access) ||
                      currentPlan?.plan?.title?.includes("Bundle") ||
                      currentPlan?.plan?.title?.includes("Amazon") ? (
                      <div className="content">
                        Upgrade to Premium Plus today to get unlimited access to all of our Practice
                        Tests, Videos, Hands-On-Labs, and Sandboxes!
                        <a href="/pricing" className="btn btn-upgrade">
                          Upgrade
                        </a>
                      </div>
                    ) : (
                      <div className="content">
                        Renew to Premium Plus today to get unlimited access to all of our Practice
                        Tests, Videos, Hands-On-Labs, and Sandboxes!
                        <a href="/pricing" className="btn btn-upgrade">
                          Renew
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INVOICES START */}
          <div className="white-box invoice-block">
            <div className="head-section">Invoice(s)</div>
            <div className="invoice-table">
              <div className="heading">
                <ul style={{listStyle:"none"}}>
                  <li>Plan Details</li>
                  <li>Start Date</li>
                  <li>End Date</li>
                  <li>Status</li>
                  <li>Amount</li>
                  <li>Invoice</li>
                </ul>
              </div>
              <div className="invoice-content">
                <ul style={{listStyle:"none"}}>
                  {userSubs?.active_plans.length > 0 ? (
                    userSubs.active_plans.map((item, i) => (
                      <li className="list">
                        <div data-label="Plan Details">{item.plan?.title}</div>
                        <div data-label="Start Date">
                          {moment(new Date(item.start_date)).format("ll")}
                        </div>
                        {item?.type?.toLowerCase() === "automatic" ? (
                          <div data-label="End Date">
                            {item?.end_date ? moment(new Date(item.end_date)).format("ll") : "N/A"}
                          </div>
                        ) : (
                          <div data-label="End Date">
                            {item?.end_date
                              ? moment(new Date(item.end_date)).format("ll")
                              : "Lifetime"}
                          </div>
                        )}
                        <div data-label="Status">{item?.order_status || "Incomplete"}</div>
                        {item?.order_total && item?.type?.toLowerCase() === "automatic" ? (
                          <div data-label="Amount">
                            {item.currency} {"$"}
                            {item?.order_total?.toFixed(2)}
                          </div>
                        ) : (
                          <div data-label="Amount">
                            {item.order_total != null ? item.order_total : "Free"}
                          </div>
                        )}

                        <div data-label="Invoice">
                          {item?.type?.toLowerCase() === "automatic" ? (
                            <a
                              className="link-view"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => openOrderDetailModal(e, item)}
                            >
                              View
                            </a>
                          ) : (
                            <a className="link-view" style={{ cursor: "pointer" }}>
                              N/A
                            </a>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li
                      style={{
                        textAlign: "center",
                        padding: "1em",
                      }}
                    >
                      No Records Found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* INVOICES END */}
        </div>
      </div>
    </>
  );
};

const subOldUi = ({ subscriptionPlans, currentPlan, handleSubscriptionChange }) => {
  return (
    <>
      {subscriptionPlans.map((item) => (
        <div className="block" key={item.id}>
          <div className="head">
            <div className="left">
              <span>{item.title}</span>
              <hr />
            </div>
            <div className="right">
              <div className="price-block">
                <del className="old-price">US ${item?.price?.usd}</del>
                <span className="price">US ${item?.offer_price?.usd}</span>
              </div>
              <small>{item.subscription_for} Months</small>
            </div>
          </div>
          <ul style={{listStyle:"none"}}>
            <li className="active">Unlimited access to all Video Course</li>
            <li className="active">Unlimited access to all Practice Tests</li>
            <li className="active">Unlimited access to Hands-on-Labs</li>
            <li className="active">Accessed on PC, Mac, iPhone®, iPad®,Android™ Device</li>
            <li className="active">Premium Support</li>
          </ul>
          <button
            className={
              currentPlan && currentPlan?.plan_id === item.id ? "btn disabled" : "btn btn-upgrade"
            }
            disabled={currentPlan && currentPlan?.plan_id === item.id}
            onClick={() => handleSubscriptionChange(item)}
          >
            {currentPlan
              ? currentPlan.plan_id === item.id
                ? "Active"
                : "Upgrade Now"
              : "Subscribe Now"}
          </button>
        </div>
      ))}
      <div className="block premium">
        <div className="block-title">
          Business
          <br /> Plan for Team
          <span>For more than 5 Users</span>
        </div>
        <hr />
        <div className="mid-content">
          <p>
            At an annual subscription of <strong>US $149</strong> per user per year
          </p>
        </div>
        <a href="https://business.whizlabs.com/" target="_blank" className="btn btn-upgrade">
          Know More
        </a>
      </div>
    </>
  );
};

export default MySubscription;
