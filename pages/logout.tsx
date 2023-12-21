import { useEffect } from "react";
import { authLogout } from "../redux/Auth/auth-actions";
import { clearCart } from "../redux/AddToCart/cart-actions";
import { updateRedirection } from "../redux/Redirection/redirect-actions";
import { connect } from "react-redux";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = ({ authLogoutAction, clearCartAction }) => {
  const router = useRouter();

  // const ref_url = "http://localhost:5001/logout/?ref=nav.com";
  const ref_url = router.query.ref + "";

  useEffect(() => {
    authLogoutAction();
    clearCartAction();
    signOut({ redirect: false, callbackUrl: ref_url });
    setTimeout(() => {
      window.location.href = ref_url;
    }, 1000);
  }, []);

  return <>Logout</>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogoutAction: () => dispatch(authLogout()),
    clearCartAction: () => dispatch(clearCart()),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
