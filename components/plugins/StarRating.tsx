import { useEffect, useState } from "react";

export const StarRatingInput = ({ starRatingInput, setStartRatingInput }) => {
  const [starRating, setStarRating] = useState(starRatingInput);
  const [starHover, setStarHover] = useState(null);

  useEffect(() => {
    setStartRatingInput(starRating);
  }, [starRating]);

  useEffect(() => {
    setStarRating(starRatingInput);
    setStartRatingInput(starRatingInput);
  }, [starRatingInput]);

  return (
    <div className="rating-block">
      <p>Please leave your rating <span style={{ color: "red" }}>*</span></p>
      <div className="stars-group">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <figure key={ratingValue}>
              <img
                data-value="off"
                onClick={() => setStarRating(ratingValue)}
                className="img-full"
                src={
                  ratingValue <= (starHover || starRating)
                    ? "/images/star-big-on.svg"
                    : "/images/star-big-off.svg"
                }
                alt=""
                onMouseEnter={(e) => setStarHover(ratingValue)}
                onMouseLeave={(e) => setStarHover(null)}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
};

const StarRating = ({
  avgRating,
  totalRating = null,
  isSamp = false,
  isSingle = false,
  bigSizeStar = false,
  children = null,
  onlyCount = false,
  starBox = false,
}) => {
  let starOn = "/images/star-on.svg";
  let starOff = "/images/star-off.svg";
  let starHalf = "/images/star-half.svg";

  if (bigSizeStar) {
    starOn = "/images/star-big-on.svg";
    starOff = "/images/star-big-off.svg";
  }

  // Round to nearest half
  avgRating = Math.floor(avgRating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = avgRating; i >= 1; i--) {
    output.push(
      <figure key={"q" + i}>
        <img className="img-full" src={starOn} alt="" />
      </figure>
    );
  }

  // If there is a half a star, append it
  if (i == 0.5) {
    output.push(
      <figure key={"w" + i}>
        <img className="img-full" src={starHalf} alt="" />
      </figure>
    );
  }

  // Fill the empty stars
  for (let j = 5 - avgRating; j >= 1; j--) {
    output.push(
      <figure key={"e" + j}>
        <img className="img-full" src={starOff} alt="" />
      </figure>
    );
  }

  return isSingle ? (
    <div className="rating-block">
      <div className={starBox ? "stars-box" : "stars-group"}>
        <figure>
          <img className="img-full" src="/images/star-on.svg" alt="" />
        </figure>
        <samp>{avgRating.toFixed(1)}</samp>
        {isSamp && <span>({new Intl.NumberFormat("en-IN").format(totalRating)} ratings)</span>}
      </div>
      {children}
    </div>
  ) : (
    <div className="rating-block">
      {!isSamp ? (
        <div className={starBox ? "stars-box" : "stars-group"}>
          {output}
          <span>{avgRating.toFixed(1)}&nbsp;</span>
        </div>
      ) : (
        <div className={starBox ? "stars-box" : "stars-group"}>
          {output}
          <samp>{avgRating.toFixed(1)}&nbsp;</samp>
        </div>
      )}

      {totalRating !== null ? (
        <div className="total-rating">
          <span>
            ({totalRating}
            {!onlyCount && <small> ratings</small>})
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default StarRating;
