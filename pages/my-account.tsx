import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { authLogout } from "redux/Auth/auth-actions";
import MyProfile from "../components/shared/my-profile";
import MySubscription from "../components/shared/my-subscription";
import MyPurchaseHistory from "../components/shared/my-purchase-history";
import MyNotifications from "../components/shared/my-notifications";
import MyAccountUpdate from "../components/shared/my-account-update";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import Link from "next/link";
import { addSubscription, clearCart } from "redux/AddToCart/cart-actions";
import { storeUserProfile,IsMailsend } from "redux/UserProfile/profile-actions";
import Head from "next/head";
import { EmailPopup } from "@/components/shared/Modals";
const redirect = process.env.NEXT_PUBLIC_BASE_PATH;
const MyAccount = ({
  data,
  userData,
  authLogoutAction,
  alertBoxAction,
  clearCartAction,
  addSubscriptionAction,
  email_verified,
  UpdateUserProfile,
  mail_sent,
  Mailsentaction,
  seoHomePageData,
}) => {
  
  const router = useRouter();
  const { ref } = router.query
  const [tab, setTab] = useState({
    myProfile: ref !== "true" && ref !="account" ? true : false,
    subscription: false,
    purchaseHistory: ref == "true" ? true : false,
    notifications: false,
    account: ref == "account"?true:false,
  });

  const { profile, professional, orders, countries, states, cities, subscriptions } = data;

  // console.log('profile', profile);

  useEffect(() => {
    if (userData && userData.data.user_id) {
      document.getElementById("wrapper").classList.add("dashboard-page");
    } else {
      router.push("/");
    }
  }, [userData]);

  const changeTab = (value) => {
    const tabs = {
      myProfile: value === 1 ? true : false,
      subscription: value === 2 ? true : false,
      purchaseHistory: value === 3 ? true : false,
      notifications: value === 4 ? true : false,
      account: value === 5 ? true : false,
    };
    setTab(tabs);
  };

  // if (!userData || !userData.data || !userData.data.user_id) {
  //   return <>Loading...</>;
  // }

  return (
    <>
      {/* <Head>
        <title>My Account | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <EmailPopup user_id={userData?.data?.user_id} redirect={redirect} email={userData?.data?.user_email} alert={alertBoxAction} Mailsentaction={Mailsentaction}/>
      <div id="content-area" className="bg-color acc-setting-page">
        <div className="sub-header">
          <div className="container">
            <div className="left">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <a>My Profile</a>
                  </li>
                </ul>
              </div>
              <h1>Account Settings</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-tab">
          <div id="dashboard-tab">
            <div className="wrapper-list">
              <div className="container">
                {/* <span className="previous">&lt;</span> */}
                <ul className="tab_list" style={{listStyle:"none"}}>
                  <li
                    onClick={() => changeTab(1)}
                    className={tab.myProfile ? "resp-tab-active" : ""}
                  >
                    My Profile
                  </li>
                  {/* <li
                    onClick={() => changeTab(2)}
                    className={tab.subscription ? "resp-tab-active" : ""}
                  >
                    Subscription
                  </li> */}
                  <li
                    onClick={() => changeTab(3)}
                    className={tab.purchaseHistory ? "resp-tab-active" : ""}
                  >
                    Orders
                  </li>
                  {/* <li
                    onClick={() => changeTab(4)}
                    className={tab.notifications ? "resp-tab-active" : ""}
                  >
                    Notifications
                  </li>
                  */}
                  <li onClick={() => changeTab(5)} className={tab.account ? "resp-tab-active" : ""}>
                    Account
                  </li>
                </ul>
                {/* <span className="next">&gt;</span> */}
              </div>
            </div>
            <div className="tab-wrap">
              <div className="">
                <MyProfile
                  tabActive={tab.myProfile}
                  navigateToAccountTab={() => changeTab(5)}
                  profile={profile}
                  professional={professional}
                  countries={countries}
                  statesList={states}
                  citiesList={cities}
                  userId={userData?.data.user_id}
                  alertBox={alertBoxAction}
                />
                {/* <MySubscription
                  tabActive={tab.subscription}
                  profile={profile?.subscrptions}
                  userData={profile}
                  subscriptionData={subscriptions}
                  alertBox={alertBoxAction}
                  subChangeAction={addSubscriptionAction}
                /> */}
                <MyPurchaseHistory
                  tabActive={tab.purchaseHistory}
                  orders={orders}
                  alertBox={alertBoxAction}
                  subscriptionCompData={{
                    tabActive: tab.subscription,
                    profile: profile?.subscrptions,
                    userData: profile,
                    subscriptionData: subscriptions,
                    alertBox: alertBoxAction,
                    subChangeAction: addSubscriptionAction,
                  }}
                />
                <MyNotifications
                  tabActive={tab.notifications}
                  profile={profile}
                  userId={userData?.data.user_id}
                  alertBox={alertBoxAction}
                />
                <MyAccountUpdate
                  tabActive={tab.account}
                  clearCart={clearCartAction}
                  profile={profile}
                  userId={userData?.data.user_id}
                  authLogout={authLogoutAction}
                  alertBox={alertBoxAction}
                  email_verified={email_verified}
                  UpdateUserProfile={UpdateUserProfile}
                  userData={userData}
                  mailSent ={mail_sent}
                  Mailsentaction={Mailsentaction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    email_verified : state.userProfileData.email_verified,
    mail_sent:state.userProfileData.mail_sent || false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogoutAction: () => dispatch(authLogout()),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    addSubscriptionAction: (data) => dispatch(addSubscription(data)),
    clearCartAction: () => dispatch(clearCart()),
    UpdateUserProfile:(userToken)=> dispatch(storeUserProfile(userToken)),
    Mailsentaction: ()=>dispatch(IsMailsend())
  };
};

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);

  const split1 = decoded.split("userData=")[1];

  let userId = null;
  let userToken = null;
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userId = parsed ? parsed.data.user_id : null;
    userToken = parsed ? parsed.data.token : null;
  }

  let states = null;
  let cities = null;
  let profile = null;
  let orders = null;
  let professional = null;

  if (userToken) {
    const profileResp = await axios.get(baseUrl + "/users/profile", {
      headers: { Authorization: userToken },
    });
    profile = profileResp.data.data;
    professional = profileResp.data.profile;
    
    if (profile && profile.country_id && profile.state_id) {
      const stateResp = await axios.get(baseUrl + "/data/states/" + profile.country_id);
      states = stateResp.data.data;
      const cityResp = await axios.get(baseUrl + "/data/cities/" + profile.state_id);
      cities = cityResp.data.data;
    }

    const ordersResp = await axios.get(baseUrl + "/orders/" + userId);
    orders = ordersResp.data.data;
    orders.forEach(async(itm)=>{
      await axios.get(`${baseUrl}/orders/freebies/order/?order_id=${itm.id}`).then((resp)=>{
        let freebies = resp.data?.obj
        for(let key in freebies)
        {
          if(freebies[key].present)
          {
            let obj = {
              course_details:{name:""},
              course_period:{start_date:"",end_date:""},
              price:0,
              product_type:"SANDBOX-1"
            }
            switch(key)
            {
              case "aws":
                obj.course_details.name = "AWS Sandbox"
                obj.course_period.start_date = freebies[key].start_date
                obj.course_period.end_date = freebies[key].end_date
                itm.order_details.push(obj)
                break;
              case "gcp":
                obj.course_details.name = "Google Cloud Sandbox"
                obj.course_period.start_date = freebies[key].start_date
                obj.course_period.end_date = freebies[key].end_date
                itm.order_details.push(obj)
                break;
              case "powerbi":
                obj.course_details.name = "Power Bi Sandbox"
                obj.course_period.start_date = freebies[key].start_date
                obj.course_period.end_date = freebies[key].end_date
                itm.order_details.push(obj)
                break;
              case "azure":
                obj.course_details.name = "Azure Cloud Sandbox"
                obj.course_period.start_date = freebies[key].start_date
                obj.course_period.end_date = freebies[key].end_date
                itm.order_details.push(obj)
                break;
            }
          }
        }
      })
    })
  }else{
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  
  const countriesResp = await axios.get(baseUrl + "/data/countries");
  const countries = countriesResp.data.data;

  const subscriptionResp = await axios.get(baseUrl + "/subscription/plans");
  const subscriptions = subscriptionResp.data.data;

  const seoHomePageData = {
    seoPageType: "accountPage",
    title: "My Account | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
    ],
  };

  return {
    props: {
      data: {
        profile,
        professional,
        orders,
        countries,
        states,
        cities,
        subscriptions,
      },
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
