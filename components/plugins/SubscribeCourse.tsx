import Link from "next/link";

const SubscribeCourse = ({
  data = {
    totalPrice: "US $199",
    offerPrice: "US $99",
  },
}) => {
  return (
    <>
      {/* <!-- subscription-block --> */}
      <div className="subscription-block">
        <div className="container">
          <div className="container-left" style={{ background: "none", padding: "0" }}>
            <Link href={"/pricing"}>
              <a>
                <img src="/images/sub_cart_W910-H1601.png" />
              </a>
            </Link>
            {/* <div className="left-block">
              <span>Unlimited access to all Courses and hands-on labs</span>
              <h2>
                Enroll for our <strong> Annual Subscription </strong>
              </h2>
              <span>To know more</span>
            </div>
            <div className="right-block">
              <div className="price-block">
                <del className="old-price">{data.totalPrice}</del>
                <span className="price">{data.offerPrice}</span>
              </div>
              <Link href="/pricing">
                <a className="btn enroll-btn">Enroll Now</a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribeCourse;
