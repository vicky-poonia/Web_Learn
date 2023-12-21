import Link from "next/link";
const ContactUsAction = ({text = null}) => (
  <>
    {/* <!-- upgradation-block --> */}
    <div className="upgradation-block">
      <div className="container">
        <div className="caption">
        {
            text ? text : "Still have some questions left? Let's discuss."
        }
        </div>
        <Link href="/contact-us">
        <a className="btn btn-white">
          CONTACT US
        </a>
        </Link>
      </div>
    </div>
  </>
);

export default ContactUsAction;
