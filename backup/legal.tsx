import Head from "next/head";
import Link from "next/link";

const Legal = () => (
  <>
    <Head>
      <title>Legal | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
    </Head>
    <div id="content-area" className="terms-use-page">
      <div className="page-content">
        <div className="container-small">
          <div className="page-title">
            <h2>Legal</h2>
          </div>
          <p>
            Whizlabs legal agreement, combined with the Privacy Policy, Terms of Use, Learning
            Programs Guarantee, Refund Policy, and/or disclaimers posted on the website create the
            entire legal agreement. Whizlabs legal agreement governs your use of our website and
            supplants any prior agreements, if any, related to any matter mentioned in this
            agreement.
          </p>
          <h3>Privacy Policy</h3>
          <p>
            <span>
              We ensure that your privacy is protected with us. Our privacy policy explains how your
              business and personal information that you share with us is collected, used, and
              protected by Whizlabs. When you visit our website, you submit your agreement to our
              collection and use of information according to our privacy policy. We ensure that we
              don&rsquo;t share, transfer, rent or sell your information to the third party other
              than that is mentioned in our privacy policy. Read our full privacy policy to
              understand the terms in detail.
            </span>
            <Link href="/privacy-policy">
              <a className="btn-default">&nbsp;Know More...</a>
            </Link>
          </p>
          <h3>Terms of Use</h3>
          <p>
            <span>
              The terms of use document define the terms and conditions that you are agreed to
              whenever you use our website{" "}
            </span>
            <a href="https://www.whizlabs.com" rel="noopener">
              <span>www.whizlabs.com</span>
            </a>
            <span>
              , its content, products and services or features and functions. It is advised to every
              registered or unregistered user of Whizlabs to visit the Terms of Use page once.
              It&rsquo;s worth note that all the products, content, and services on Whizlabs website
              are only Whizlabs products and property. The Whizlabs website, products, services, and
              content are all owned, operated, and maintained by Whizlabs only. To know more, read
              the complete Terms of Use document.{" "}
            </span>
            <Link href="/terms-of-use">
              <a className="btn-default">&nbsp;Know More</a>
            </Link>
          </p>
          <h3>Learning Program Guarantee</h3>
          <p>
            <span>
              Whizlabs is aimed to help professionals to prepare and pass the certification exams.
              Our learning programs (online courses and practice tests) are best-in-industry and for
              this, they come with the learning program guarantee. Our training material comes with
              100% customer satisfaction guarantee, 100% exam objectives covered guarantee, and 100%
              unconditional money back guarantee. So, don&rsquo;t worry about the quality, you will
              definitely be satisfied with Whizlabs training. If not, we will assist you until you
              reach the highest level of satisfaction. Learn more about Whizlabs learning program
              guarantee.
              <Link href="/our-learning-programs-guarantee">
                <a className="btn-default">&nbsp;Know More...</a>
              </Link>
              <br />
            </span>
          </p>
          <h3>Refund Policy</h3>
          <p>
            <span>
              Whizlabs team is dedicated to providing a gratifying experience to the users. We are
              also aimed to provide our users with great satisfaction with our products and
              services. We offer a user-friendly interface to find, purchase, access our products.
              Whenever you purchase any Whizlabs product (online course or practice test), you
              submit your consent and agree to our terms and conditions. So it is required for the
              users to get familiar with the terms and conditions that are associated with the
              refund of online purchase. Read the complete refund policy document to understand the
              terms in detail.
              <Link href="/refund-policy">
                <a className="btn-default">&nbsp;Know More...</a>
              </Link>
              <br />
            </span>
          </p>

          <p>
            <strong>
              Note that whenever you purchase any Whizlabs product, you are agreed to our terms and
              conditions associated with the Whizlabs. So, it is recommended to read and understand
              the Whizlabs legal agreement.
            </strong>
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Legal;
