import Image from "next/image";

const Brands = ({ data, custom_title = null, moreData=[] }) => {
  return (
    <>
      {/* <!-- brands-block --> */}
      <div className="brands-block">
        <div className="container">
          {custom_title ? (
            <div className="title">{custom_title}</div>
          ) : (
            <div className="title">
              We are blessed with some amazing clients. Here are just a few!
            </div>
          )}
          <div className="brand-logoes">
            {!data ? (
              <>Loading...</>
            ) : (
              data.map((brand) => (
                <figure key={brand.id}>
                  <img className="img-full" src={brand.imgUrl} alt="brand" />
                </figure>
              ))
            )}
          </div>
          <div className="more-slide">
            <div className="more-logo brand-logo">
            {!moreData ? (
              <>Loading...</>
            ) : (
              moreData.map((brand) => (
                <figure key={brand.id}>
                  <img className="img-full" src={brand.imgUrl} alt="brand" />
                </figure>
              ))
            )}
            </div>
          </div>
          <div className="moreless-button">View More</div>
        </div>
      </div>
    </>
  );
};

export default Brands;
