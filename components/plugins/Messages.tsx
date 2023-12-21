export const MessageSuccess = ({ title, msg }) => {
  const closeModal = () => {
    document.querySelector("body").classList.remove("open-success-msg");
  }
  return (
    <div className="success-msg msg-box">
      <div className="msg-inner">
        <figure>
          <img className="img-full" src="/images/success-msg.svg" alt="" />
        </figure>
        <div className="content">
          <span>{title}</span>
          <p>{msg}</p>
        </div>
        <i onClick={closeModal} className="icon icon-close icon-font-cross-bold"></i>
      </div>
    </div>
  );
};

export const MessageAlert = ({ title, msg }) => {
  return (
    <div className="alert-msg msg-box">
      <div className="msg-inner">
        <figure>
          <img className="img-full" src="/images/alert-msg.svg" alt="" />
        </figure>
        <div className="content">
          <span>{title}</span>
          <p>{msg}</p>
        </div>
        <i className="icon icon-close icon-font-cross-bold"></i>
      </div>
    </div>
  );
};

export const MessageError = ({ title, msg }) => {
  const closeModal = () => {
    document.querySelector("body").classList.remove("open-error-msg");
  }
  return (
    <div className="error-msg msg-box">
      <div className="msg-inner">
        <figure>
          <img className="img-full" src="/images/error-msg.svg" alt="" />
        </figure>
        <div className="content">
          <span>{title}</span>
          <p>{msg}</p>
        </div>
        <i onClick={closeModal} className="icon icon-close icon-font-cross-bold"></i>
      </div>
    </div>
  );
};
