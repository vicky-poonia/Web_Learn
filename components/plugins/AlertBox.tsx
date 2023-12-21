import { useEffect, useState } from "react";

const Alert = ({ alertMessage, alertBoxAction }) => {
  const [alert, setAlert] = useState({
    type: "",
    imgUrl: "",
    title: "",
    msg: "",
  });

  useEffect(() => {
    // Success Message
    if (alertMessage && alertMessage.type === "SUCCESS") {
      let data = {
        type: "success-msg",
        imgUrl: "/images/success-msg.svg",
        title: alertMessage.title,
        msg: alertMessage.msg,
      };
      setAlert(data);
      if (!document.querySelector("body").classList.contains("open-success-msg")) {
        document.querySelector("body").classList.add("open-success-msg");
        setTimeout(function () {
          alertBoxAction(null);
          document.querySelector("body").classList.remove("open-success-msg");
          setAlert({
            type: "",
            imgUrl: "",
            title: "",
            msg: "",
          });
        }, 6000);
      }
    }
    // Error Message
    if (alertMessage && alertMessage.type === "ERROR") {
      let data = {
        type: "error-msg",
        imgUrl: "/images/error-msg.svg",
        title: alertMessage.title,
        msg: alertMessage.msg,
      };
      setAlert(data);
      if (!document.querySelector("body").classList.contains("open-error-msg")) {
        document.querySelector("body").classList.add("open-error-msg");
        setTimeout(function () {
          alertBoxAction(null);
          document.querySelector("body").classList.remove("open-error-msg");
          setAlert({
            type: "",
            imgUrl: "",
            title: "",
            msg: "",
          });
        }, 6000);
      }
    }
    // Warning Message
    if (alertMessage && alertMessage.type === "WARNING") {
      let data = {
        type: "alert-msg",
        imgUrl: "/images/alert-msg.svg",
        title: alertMessage.title,
        msg: alertMessage.msg,
      };
      setAlert(data);
      if (!document.querySelector("body").classList.contains("open-alert-msg")) {
        document.querySelector("body").classList.add("open-alert-msg");
        setTimeout(function () {
          alertBoxAction(null);
          document.querySelector("body").classList.remove("open-alert-msg");
          setAlert({
            type: "",
            imgUrl: "",
            title: "",
            msg: "",
          });
        }, 6000);
      }
    }
  }, [alertMessage]);

  const closeAlertBox = () => document.body.classList.remove("open-" + alert.type);

  return (
    <>
      <div className={"msg-box " + alert.type}>
        <div className="msg-inner">
          <figure>
            <img className="img-full" src={alert.imgUrl} alt="" />
          </figure>
          <div className="content">
            <span>{alert.title}</span>
            <p>{alert.msg}</p>
          </div>
          <i className="icon icon-close icon-font-cross-bold" onClick={closeAlertBox}></i>
        </div>
      </div>
    </>
  );
};

export default Alert;
