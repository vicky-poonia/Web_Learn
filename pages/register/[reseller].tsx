import { useForm } from "react-hook-form";
import { resellerRegister } from "@/services/reseller-services/services";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { authResellerLogin } from "redux/Auth/auth-actions";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Register = ({
  storeToLocalStorage,
  alertBoxAction,
  userInfo,
  reseller,
  userData,
  countries,
  seoHomePageData,
}) => {
  const router = useRouter();
  let currentLocation = router.pathname;
  const { register, handleSubmit, watch, errors } = useForm();
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userData && userData?.data?.user_id) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (formData, e) => {
    setLoading(true);
    const response = await resellerRegister({
      reseller_id: userInfo?.id,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      country: formData.country,
      state: formData.state,
      voucher_code: formData.voucher_code,
    });
    if (response?.data?.status === 1) {
      alertBoxAction({
        type: "SUCCESS",
        title: "Success",
        msg: "Voucher code applied successfully!",
      });
      setLoading(false);
      storeToLocalStorage(response.data,currentLocation);
      e.target.reset();
    } else {
      setLoading(false);
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: response.data.message,
      });
    }
  };

  const changeCountry = async (e) => {
    setStates([]);
    const countryId = e.target.value;
    if (countryId) {
      const stateResp = await axios.get(baseUrl + "/data/states/" + countryId);
      setStates(stateResp?.data?.data);
    }
  };

  return (
    <>
      {/* <Head>
        <title>Login or Sign up | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area" className="reseller-register-page">
        <div className="register-page">
          <div className="graphic-img">
            <figure></figure>
          </div>
          <div className="container">
            <div className="left">
              <Link href="/">
                <a className="logo">
                  <img className="img-full" src="/images/logo.svg" alt={"whizlabs reseller user"} />
                </a>
              </Link>
              <div className="content">
                <span>Welcome to Whizlabs</span>
                <p>
                  {userInfo?.name} partners with Whizlabs to improve the skills of millions of
                  learners and help them getting certified to achieve their career goals.
                </p>
              </div>
            </div>
            <div className="right">
              <div className="box">
                <div className="head">
                  <figure>
                    <img
                      className="img-full"
                      src={
                        userInfo && userInfo.logo
                          ? process.env.NEXT_PUBLIC_WEB_MEDIA_URL + userInfo.logo
                          : "/images/user-not-found.svg"
                      }
                      alt={userInfo?.name}
                      style={{ borderRadius: "100%", width: "80px", height: "80px" }}
                    />
                  </figure>
                  <span>{userInfo?.name}</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input type="text" name="name" ref={register({ required: true })} />
                      {errors.name && <span style={{ color: "red" }}>This field is required</span>}
                    </div>
                    <div className="input-box">
                      <label>
                        Email<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        ref={register({
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <span style={{ color: "red" }}>Please enter valid email</span>
                      )}
                    </div>
                    <div className="input-box">
                      <label>
                        Create a Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        ref={register({ required: true, minLength: 6 })}
                      />
                      {errors.password && errors.password.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                      {errors.password && errors.password.type === "minLength" && (
                        <span style={{ color: "red" }}>Password length must be 6 characters.</span>
                      )}
                    </div>

                    <div className="input-box">
                      {/* <label>
                        Country<span style={{ color: "red" }}>*</span>
                      </label> */}
                      <select
                        name="country"
                        ref={register({ required: true })}
                        onChange={(e) => changeCountry(e)}
                      >
                        <option value="" disabled selected>
                          Select Country
                        </option>
                        {countries?.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>

                    <div className="input-box">
                      {/* <label>
                        State<span style={{ color: "red" }}>*</span>
                      </label> */}
                      <select name="state" ref={register({ required: true })}>
                        <option value="" disabled selected>
                          Select State
                        </option>
                        {states.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span style={{ color: "red" }}>This field is required</span>}
                    </div>

                    <div className="input-box">
                      <label>
                        Voucher Code<span style={{ color: "red" }}>*</span>{" "}
                        <small>(Enter your voucher code here)</small>
                      </label>
                      <input type="text" name="voucher_code" ref={register({ required: true })} />
                      {errors.voucher_code && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <p className="btn btn-signup">Loading...</p>
                  ) : (
                    <button className="btn btn-signup">Sign up</button>
                  )}
                </form>
                <div className="terms-block">
                  By signing up, you agree to our <Link href="/terms-of-use">Terms of Use</Link>,{" "}
                  <Link href="/end-user-license-agreement">EULA</Link> and{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>.
                </div>
                <div className="alrady-account">
                  Already have an account?{" "}
                  <Link href={"/login/" + userInfo?.unique_id}>
                    <a>Sign in</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// This also gets called at build time
export const getServerSideProps = async (context) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { reseller } = context.params;
  const resp = await axios.get(baseUrl + "/users/reseller?user_name=" + reseller);

  const seoHomePageData = {
    title: "Login or Sign up | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };

  if (!resp || resp.data.status == "error") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let countries = [];
  const countriesResp = await axios.get(baseUrl + "/data/countries");
  countries = countriesResp?.data?.data;

  // Pass post data to the page via props
  return { props: { userInfo: resp.data?.data, reseller: reseller || "", countries: countries, seoHomePageData } };
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeToLocalStorage: (values,path) => dispatch(authResellerLogin(values,path)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
