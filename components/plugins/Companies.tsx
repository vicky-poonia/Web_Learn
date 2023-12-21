import Image from "next/image";

const Companies = ({ data }) => {
  return (
    <>
      {/* <!-- company-block --> */}
      <div className="compuny-block">
        <div className="container">
          <div className="block-heading">
            <h4 className="title">
              We have helped over 5 Million working professionals to achieve their career goals with
              our online training courses and practice tests.
            </h4>
            <p style={{ textAlign: "left" }}>
              We understand that the quality of training content is the most important factor to
              consider when preparing for any certification exam. We also understand the importance
              of passing the certification exam in your first attempt.
              <br />
              <br />
              As a result, we have developed our training contents to be of highest quality,
              constantly improving and affordable to ensure our learners get the best training
              content available in the market.
            </p>
          </div>
          <div className="compuny-logoes">
            {data.map((company) => (
              <figure key={company.id}>
                <img className="img-full" src={company.imgUrl} alt={company} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
