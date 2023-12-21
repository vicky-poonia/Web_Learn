import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CrazyDealSidebar = ({ crazyDealData, currency }) => {
  if (!crazyDealData) return <></>;
  // To calculate the time difference of two dates
  const Difference_In_Time =
    new Date(crazyDealData.end_date).getTime() - new Date(crazyDealData.start_date).getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  if (Difference_In_Days <= 1) {
    Difference_In_Days = 1;
  }

  const promoTxt = Difference_In_Days + (Difference_In_Days <= 1 ? " DAY" : " DAYS");

  return (
    <div className="crazy-content">
      <label>
        SPECIAL <strong>{promoTxt}</strong> OFFER
      </label>
      <h6>CRAZY DEAL</h6>
      <p dangerouslySetInnerHTML={{ __html: crazyDealData.banner_right }} />
      {/* <div className="discount-block">
        <figure>
          <img className="img-full" src="/images/offer-percentage.svg" alt="" />
        </figure>
        <span>
          Get a flat <strong>{crazyDealData.discount_percentage[currency.type]}% OFF</strong>{" "}
          discount
        </span>
      </div> */}
      <figure className="sharp-top">
        <img className="img-full" src="/images/crazy-top.svg" alt="" />
      </figure>
      <figure className="sharp-bottom">
        <img className="img-full" src="/images/crazy-bottom.svg" alt="" />
      </figure>
      <figure className="dots-top">
        <img className="img-full" src="/images/crazy-dots.svg" alt="" />
      </figure>
      <figure className="dots-bottom">
        <img className="img-full" src="/images/crazy-dots.svg" alt="" />
      </figure>
    </div>
  );
};

export default CrazyDealSidebar;
