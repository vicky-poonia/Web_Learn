import Link from "next/link";
const CallToAction = () => (
  <>
    {/* <!-- upgradation-block --> */}
    <div className="upgradation-block">
      <div className="container">
        <div className="caption">
          <b>ENJOY THE POWER OF INDEPENDENT LEARNING</b>
        </div>
        <Link href="/pricing">
          <a className="btn btn-white">Compare Plans</a>
        </Link>
      </div>
    </div>
  </>
);

export default CallToAction;
