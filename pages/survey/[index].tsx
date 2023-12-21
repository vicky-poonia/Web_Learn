import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Survey = (seoHomePageData) => {
  const router = useRouter();
  const slug = router.query.index;

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data, e) => {
    e.target.reset(); // reset form inputs
  };

  return (
    <>
      {/* <Head>
        <title>Whizlabs Survey - Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      {/* Survey Form */}
      <div id="content-area" className="survey-page">
        <div className="page-content">
          <div className="container">
            <h1 className="page-title">This will help us to make better</h1>
            <div className="white-box">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="block">
                  <p>
                    What do you like best about Whizlabs AWS Certified Solutions Architect Associate
                    Online Course and why?
                  </p>
                  <div className="textarea-box">
                    <textarea name="inputValue1" ref={register({ required: true })}></textarea>
                  </div>
                  {errors.inputValue1 && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </div>
                <div className="block">
                  <p>
                    How has our content helped you to prepare for the AWS Solutions Architect
                    Associate Exam?
                  </p>
                  <div className="rbtn-group">
                    <label className="custom-radiobutton">
                      <input type="radio" value="1" name="inputValue2" ref={register()} checked />
                      <span className="radio-style"></span>
                      <span className="name">Yes</span>
                    </label>
                    <label className="custom-radiobutton">
                      <input type="radio" value="0" name="inputValue2" ref={register()} />
                      <span className="radio-style"></span>
                      <span className="name">No</span>
                    </label>
                  </div>
                </div>
                <div className="block">
                  <p>
                    Why would you recommend a colleague to enroll for the AWS Certified Solutions
                    Architect Associate Online Course?
                  </p>
                  <div className="rbtn-group">
                    <label className="custom-radiobutton">
                      <input type="radio" value="1" name="inputValue3" ref={register()} checked />
                      <span className="radio-style"></span>
                      <span className="name">Yes</span>
                    </label>
                    <label className="custom-radiobutton">
                      <input type="radio" value="0" name="inputValue3" ref={register()} />
                      <span className="radio-style"></span>
                      <span className="name">No</span>
                    </label>
                  </div>
                </div>
                <div className="block select-box">
                  <p>
                    How has our content helped you to prepare for the AWS Solutions Architect
                    Associate Exam?
                  </p>
                  <div className="custom-selectbox">
                    <select name="inputValue4" ref={register({ required: true })}>
                      <option value="">Select list</option>
                      <option value="1">List Item 1</option>
                      <option value="2">List Item 2</option>
                      <option value="3">List Item 3</option>
                      <option value="4">List Item 4</option>
                    </select>
                  </div>
                  {errors.inputValue4 && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </div>
                <div className="block">
                  <p>
                    Why would you recommend a colleague to enroll for the AWS Certified Solutions
                    Architect Associate Online Course?
                  </p>
                  <div className="rbtn-group">
                    <label className="custom-radiobutton">
                      <input
                        type="radio"
                        value="1"
                        name="inputValue5"
                        ref={register({ required: true })}
                      />
                      <span className="radio-style"></span>
                      <span className="name">Good</span>
                    </label>

                    <label className="custom-radiobutton">
                      <input
                        type="radio"
                        value="2"
                        name="inputValue5"
                        ref={register({ required: true })}
                      />
                      <span className="radio-style"></span>
                      <span className="name">Very Good</span>
                    </label>

                    <label className="custom-radiobutton">
                      <input
                        type="radio"
                        value="3"
                        name="inputValue5"
                        ref={register({ required: true })}
                      />
                      <span className="radio-style"></span>
                      <span className="name">Excellent</span>
                    </label>
                  </div>
                  {errors.inputValue5 && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </div>
                <div className="block">
                  <p>
                    How has our content helped you to prepare for the AWS Solutions Architect
                    Associate Exam?
                  </p>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Type your answer…"
                      name="inputValue6"
                      ref={register({ required: true, minLength: 10 })}
                    />
                  </div>
                  {errors.inputValue6 && errors.inputValue6.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors.inputValue6 && errors.inputValue6.type === "minLength" && (
                    <span style={{ color: "red" }}>Minimum Length is 10</span>
                  )}
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-submit">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-cancel">
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Survey;

export async function getServerSideProps(context){
  const seoHomePageData = {
    seoPageType: "survey", // This should be changed to reflect the actual page type
    title: "Whizlabs Survey - Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };
  return {
		props: {
		seoHomePageData,
		}, // will be passed to the page component as props
	};
}