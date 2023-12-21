import Head from "next/head";
import Link from "next/link";

const TermsOfUse = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Terms of Use | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="Terms of Use - Whizlabs" />
        <meta
          name="description"
          content="Whizlabs Terms of Use is the legal notice that applies to the whole content that comes under the domain https://www.whizlabs.com and any correspondence done with Whizlabs."
        />
        <meta name="keywords" content="Terms of Use" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Use - Whizlabs" />
        <meta
          property="og:description"
          content="Whizlabs Terms of Use is the legal notice that applies to the whole content that comes under the domain https://www.whizlabs.com and any correspondence done with Whizlabs."
        />
        <meta property="og:url" content="https://www.whizlabs.com/terms-of-use/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acac65dfaa5"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Whizlabs Terms of Use is the legal notice that applies to the whole content that comes under the domain https://www.whizlabs.com and any correspondence done with Whizlabs."
        />
        <meta name="twitter:title" content="Terms of Use - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acac65dfaec"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head>
      <div id="content-area" className="terms-use-page">
        <div className="page-content">
          <div className="container-small">
            <div className="page-title">
              <h2>Terms of Use</h2>
              {/* <p>Effective From August 6, 2019</p> */}
            </div>

            <p>
              We are aimed to provide you an easy to use interface that may help you learn the
              technology. Whenever you use our website www.whizlabs.com, connected partner, content,
              study material, functionalities, features or any other online service offered by
              Whizlabs, as a registered or unregistered user, you agree to the following Terms of
              Use. So, take few minutes to get over the Terms of Use mentioned below.
            </p>
            <p>
              The Whizlabs website, the training material offered by the website, products, and
              content are owned, maintained, and operated by the Whizlabs only. All the Website
              content, products, and services are the Company products and property.
            </p>
            <p>
              These terms and conditions manage and control your use of the website{" "}
              <a href="https://www.whizlabs.com/">whizlabs.com</a> (the “Website”). Whizlabs,
              hereafter referred to as the “Company”, “Website”, “we”, or “us” while “You” refer to
              the Whizlabs user or a paying customer.
            </p>

            <h5>1. Guidelines on Using Services of the Website</h5>
            <ul>
              <li>
                You are not allowed to make unlawful use of this Website; you must agree to the
                website terms of use.
              </li>
              <li>
                The access to the website is free of cost for the users having internet access.
                However, we are not liable for any charges deducted for the internet services,
                hardware, or software cost.
              </li>
              <li>
                The Company will not be responsible, under any situation, for any changes in the
                content related to the services and products, including but not limited to the
                damage, errors, or loss experienced while using our products, services, or
                resources.
              </li>
              <li>
                Whizlabs is not liable for the faults and issues in the server or network beyond
                some limits.
              </li>
              <li>
                We are focused to provide you continuous, uninterrupted, smooth access to our
                services, but we are not bound to do so with any obligation.
              </li>
              <li>
                To access and use some of the sections of the Website, you will be required to log
                into your account. The Company have the full right to limit or block the access to
                our services for any user not following the conditions.
              </li>
            </ul>

            <h5>2. Privacy Policy</h5>
            <p>
              We value your privacy like you do, so we are committed to protecting your personal
              information. The personal information you share with us while using our Website,
              Products, or Services is subject to our Privacy Policy. We are authorized to use
              information provided by you directly or obtained by the nature of use of our services,
              maintaining your privacy with our
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
              .
            </p>

            <h5>3. Copyright and Intellectual Property</h5>
            <p>
              We respect the Intellectual Property and Copyright of others and the same we expect
              from our users
            </p>
            <p>
              The whole content of the Website is protected by the trademark and copyright laws. The
              owner of the trademarks and copyrights are whizlabs.com, it’s partners and affiliates.
              The material on the website including code, text, graphics, and software is owned by
              Whizlabs. Noone is allowed to copy, modify, reproduce, or publish the content in any
              way.
            </p>
            <p>
              We are not responsible for the content on other sites except our affiliates and
              partners, you may come across using our products or services. The Terms of Use and
              Privacy Policy of the sites will administer the material on those websites.
            </p>
            <p>
              You are not at all permitted to use any digital image, text, or logo from the website.
              To avoid copyright issues, written consent from the trademark owner is required.
              Whizlabs reserves all the rights to block the users who don’t respect and infringes
              the Whizlabs intellectual property.
            </p>

            <h5>4. Violation of Copyright or Intellectual Property Laws</h5>
            <p>
              We value and respect the intellectual property and copyright laws of others, and the
              same we expect from others. We may remove any material or access to the material on
              our website that we find may violate the copyright of others. If you observe that your
              work has been copied in any way that may cause an infringement of your intellectual
              property or copyright laws, please inform us with the required information, and we
              will act on the same.
            </p>
            <ul>
              <li>
                Claim the intellectual property in written with physical or digital signature.
              </li>
              <li>
                Description of how the material that you claim for infringement is being used by the
                website with detail.
              </li>
              <li>Description of the copyrighted work that you claim for the infringement.</li>
              <li>The contact details such as Email Address, Contact Number, and Address.</li>
              <li>
                A declarative statement specifying that the information provided by you is accurate
                and the copyright submitting is on behalf of the owner.
              </li>
              <li>
                You can also reach Whizlabs directly to notify your intellectual property and
                copyright claim by writing us at{" "}
                <a href="mailto:support@whizlabs.com">support@whizlabs.com</a>
              </li>
            </ul>

            <h5>5. Transaction Terms</h5>
            <p>
              You need to make a transaction to purchase the Website product or service. It is
              required to follow some terms and conditions while making a transaction with Whizlabs,
              these are
            </p>
            <ul>
              <li>
                If you want to make a transaction on Whizlabs website, you need to pay for the
                relative product or service.
              </li>
              <li>
                You are liable to be attentive towards your payment details such as bill, taxes, and
                discounts.
              </li>
              <li>
                To review your product purchase or transaction history, you can check the invoice.
              </li>
              <li>
                Certain products may require your consent to additional Terms and Conditions before
                you make the payment.
              </li>
            </ul>
            <p>
              We do not provide any kind of warranty with respect to any products or services sold
              on the Website. Whizlabs reserves all the rights to change or modify, to limit the
              product quantity or deny the service to anyone, without any prior notice.
            </p>

            <h5>6. Mobile and other Devices</h5>
            <p>
              If you access Whizlabs website through a mobile device, you need to be agreed with the
              following additional Terms and Conditions (collectively known as “Mobile Terms”) –
            </p>
            <ul>
              <li>
                Only you are responsible for the data and message charges on your mobile device to
                access the Website. We don’t charge anything to access our website, so all the
                charges will be billed by and payable to your mobile service provider. For any kind
                of reduction in data charges to access the internet, you need to contact your mobile
                service provider for subscription plans, pricing, and other details.
              </li>
              <li>
                The wireless connection services may be interrupted in some areas at some times
                relative to the product, coverage, software, or the service charges. You may be
                subjected to some additional terms and conditions on the basis of the type of mobile
                device you are using.
              </li>
            </ul>
            <p>
              Your access to and usage of the site through mobile device confirms your consent on
              these terms of use, including but not limited to the Mobile Terms.
            </p>

            <h5>7. Whizlabs Do's and Don'ts</h5>
            <h6>7.1 Do’s</h6>
            <p>While accessing and using the Website, you agree that you will</p>
            <ul>
              <li>
                Provide accurate and correct information about you and will keep your profile
                up-to-date
              </li>
              <li>
                Use the content, products, services, features, and functionalities of the website in
                a respectful manner
              </li>
              <li>
                Comply with the state, federal, local, and international laws as well as regulations
              </li>
              <li>Log out your account at the end of each session or the use of the Website</li>
            </ul>

            <h6>7.2 Don’ts</h6>
            <p>While accessing and using the Website, you agree that you will not</p>
            <ul>
              <li>Insult, stalk, harass, abuse, or infringe the rights of other users;</li>
              <li>
                Post, publish, or distribute any offensive, infringing, or unlawful information or
                material;
              </li>
              <li>
                Install, upload, or transfer files that are protected by the Intellectual Property
                Laws;
              </li>
              <li>Run spam scripts or anything that may affect the other users;</li>
              <li>Communicate, advertise, or sell eBooks, digital download, or phishing links;</li>
              <li>
                Use any content that may violate regulatory, legal, network operator, or
                governmental conditions.
              </li>
            </ul>

            <h5>8. Represetation, Warranties and Coverts</h5>
            <p>
              While using our Website, products, and services, you represent and warrant that you
              are:
            </p>
            <ul>
              <li>
                18 years of age or older and competent to form a contract with Whizlabs by entering
                into these Terms of Use.
              </li>
              <li>
                Above the required age to register for an account or otherwise use the Website. If
                not, you will require the supervision, involvement, and approval of the parent or
                legal guardian.
              </li>
              <li>
                Liable for all the message, service, and data charges, fees, or costs associated
                with your use or access to the Website including the maintenance of internet,
                hardware or software required for the access.
              </li>
            </ul>
            <p>
              You and Whizlabs, both, represent, warrant, and covenant that it has authority to
              enter into the agreement with respect to these Terms of Use; performs its obligation;
              and by doing so, no one violates any contractual relationship or applicable laws.
            </p>

            <h5>9. Limit of Liability</h5>
            <p>
              You clearly understand that the Company will not be liable for any direct, indirect,
              consequential, special, or incidental damages resulting from:
            </p>
            <ul>
              <li>The use or failure to use the service</li>
              <li>
                The cost of procuring substitute services, or services obtained or purchased or
                transactions made from the Website
              </li>
              <li>
                Unauthorized access to your data or transmissions or confidential informations
              </li>
              <li>
                Conducts or statements of any third party on the Company’s products or any other
                matter related to the Company’s products
              </li>
            </ul>

            <h5>10. Indemnity</h5>
            <p>
              Any user or customer paying for Whizlabs’ products or services must be agreed to the
              Company’s Terms of Use. As a consumer of the Company’s products or services, you must
              be agreed to indemnify the Company, our affiliates, directors, officers, employees,
              agents, unaffected from any claim made by third party due to the breach of this Terms
              of Use, or violation of any rights or laws of the third party.
            </p>

            <h5>11. Pricing Disclaimer</h5>
            <p>
              All the products, prices, offers, and discounts on Whizlabs websites depend on the
              sole decision made by the Company and are subjected to change without any prior notice
              or information.
            </p>
            <p>
              Although we focus on providing up-to-date and most accurate information to our
              visitors and customers, the prices for one or more products may be incorrect. It may
              be due to the technical errors, human mistakes, digital images, or mismatch in price
              received.
            </p>
            <p>
              Whizlabs reserves all the rights to modify product prices, discounts or offers. The
              changes may be done due to the changes in course by the providers, course termination,
              market conditions, advertising errors, and other transfer situations. However, if you
              have already made a purchase, that paid price will hold for you.
            </p>

            <h5>12. Changes to the Terms of the Website</h5>
            <h6>12.1 Changes to the Terms </h6>
            <p>
              The Company reserves all the rights to modify or change these Terms of Use at any time
              without any prior notice. Any of such changes made to the terms will be effective
              immediately after the time of posting the same on the website. However, the
              modifications and changes to the section Governing Laws and Jurisdiction will not be
              applicable to the ongoing disputes. We are aimed to keep you updated, and so will take
              all the possible steps to notify you about any changes in the terms of use, but you
              agree to review the website to know about any changes or modifications.
            </p>
            <p>
              Note that, your continual use of the Website with the products and services will show
              your acceptance and agreement on the updated and modified Terms of use.
            </p>

            <h6>12.2 Changes to the Website </h6>
            <p>
              Whizlabs may change, modify, or eliminate any content or feature of the Website, at
              any time, without any prior notice or liability. If you are not satisfied with any
              service-related modification or elimination, you are free to cease the use of the
              services of the Website. We are not liable if any part of the Website is unavailable
              at any time for any reason.
            </p>

            <h5>13. Miscellaneous</h5>
            <p>
              These Terms if Use along with Privacy Policy and Mobile Terms forms an entire
              agreement between you and Whizlabs relative to all the representations, agreements,
              and warranties, written and oral, with respect to the Website. These Terms of use
              don’t contain any third-party beneficiary rights. Anything related to your purchase
              such as invoice, order number etc is for reference purpose only and doesn’t bound
              Whizlabs with your terms and conditions mentioned herein or elsewhere. So, the terms
              or conditions submitted by you on only purchase will have no effect on Whizlabs and
              are hereby rejected.
            </p>
            <p>
              In case, any dispute arises between the participating parties i.e. You and us with
              respect to the Terms of Use or subject matter of these Terms of Uses, or the breach of
              these Terms of Use, the party prevailing in the dispute, whether settled in the court
              or out-of-court, will be entitled to recover all the costs from the non-prevailing
              party.
            </p>
            <p>Copyright © {currentYear} Whizlabs Software Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
