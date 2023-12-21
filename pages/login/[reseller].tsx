import { useForm } from "react-hook-form";
import { resellerLogin } from "@/services/reseller-services/services";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { authResellerLogin } from "redux/Auth/auth-actions";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Login = ({ storeToLocalStorage, alertBoxAction, userInfo, userData }) => {
  const router = useRouter();
  let currentLocation = router.pathname;
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData && userData?.data?.user_id) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (formData, e) => {
    setLoading(true);
    const response = await resellerLogin({
      company: userInfo?.id,
      email: formData.email,
      password: formData.password,
      voucher_code: formData.voucher_code || null,
    });
    if (response?.status) {
      alertBoxAction({
        type: "SUCCESS",
        title: "Success",
        msg: "Login Successfull!",
      });
      setLoading(false);
      storeToLocalStorage(response.data,currentLocation); // store data to local storage
      e.target.reset();
    } else {
      setLoading(false);
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: response.msg,
      });
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
                  <img className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
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
                        Password<span style={{ color: "red" }}>*</span>
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
                      <label>
                        Voucher Code <small>(Redeem new voucher code here)</small>
                      </label>
                      <input type="text" name="voucher_code" ref={register()} />
                    </div>
                  </div>
                  {loading ? (
                    <p className="btn btn-signup">Loading...</p>
                  ) : (
                    <button className="btn btn-signup">Sign in</button>
                  )}
                </form>
                <div className="terms-block">
                  By signing up, you agree to our <Link href="/terms-of-use">Terms of Use</Link>,{" "}
                  <Link href="/end-user-license-agreement">EULA</Link> and{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>.
                </div>
                <div className="alrady-account">
                  Don't have an account?{" "}
                  <Link href={"/register/" + userInfo?.unique_id}>
                    <a>Sign up</a>
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

  if (!resp || resp.data.status == "error") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

    const seoHomePageData = {
      seoPageType: "login",
      title: "Login or Sign up | Whizlabs",
      metaTags: [
        { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
        { name: "robots", property: "", httpEquiv: "", content: "noindex,nofollow" },
      ],
    };

  // Pass post data to the page via props
  return { props: { userInfo: resp.data?.data, seoHomePageData } };
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
