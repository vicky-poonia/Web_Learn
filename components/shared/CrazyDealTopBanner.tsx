const CrazyDealTopBanner = ({ crazyDealData = null }) => {
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
    <div className="crazy-section">
      <div className="container">
        <div className="txt-block">
          <div className="title">
            <h5>
              SPECIAL<strong> {promoTxt} </strong>OFFER{" "}
            </h5>
            <span className="cd-txt">CRAZY DEAL</span>
          </div>
          <p className="para" dangerouslySetInnerHTML={{ __html: crazyDealData.banner_top }} />
        </div>
      </div>
    </div>
  );
};

export default CrazyDealTopBanner;
