import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

const Testimonials = ({ data }) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 : 2,
    spacing: 30,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      {/* <!-- testimonial-block --> */}
      <div className="testimonial-block">
        <div className="container">
          <div className="heading">
            <figure>
              <img className="img-full" src="/images/quote-img.svg" alt="" />
            </figure>
            <h5>
              Listen To What Our <strong> Learners Have To Say </strong>
            </h5>
          </div>
          <div className="keen-theme" style={{ overflow: "hidden" }}>
            <div className="slider-blocks keen-slider" ref={sliderRef}>
              {data.map((item) => (
                <div className="block keen-slider__slide" key={item.id}>
                  {/* <h5>{data.title}</h5> */}
                  <div
                    className="testimonial-message"
                    dangerouslySetInnerHTML={{ __html: item.message }}
                  ></div>
                  <div className="user-block">
                    <figure
                      style={{ borderRadius: "50%", overflow: "hidden", width: 60, height: 60 }}
                    >
                      <img
                        className="img-full"
                        src={
                          item.upload_picture
                            ? process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                              item.upload_picture.replace("media/", "")
                            : "/images/user-not-found.svg"
                        }
                        alt={item.customer_name}
                      />
                    </figure>
                    <div className="details">
                      <span>{item.customer_name}</span>
                      <samp>{item.designation}</samp>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {slider && (
              <div className="keen-nav">
                <button
                  type="button"
                  role="presentation"
                  className={`keen-prev ${currentSlide === 0 ? "disabled" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    slider.prev();
                  }}
                  disabled={currentSlide === 0}
                />
                <button
                  type="button"
                  role="presentation"
                  className={`keen-next ${
                    currentSlide === slider.details().size - 2 ? "disabled" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    slider.next();
                  }}
                  disabled={currentSlide === slider.details().size - 2}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;

/* 

<div class="block">
  <h5>The explanations are very detailed</h5>
  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.</p>
  <div class="user-block">
    <figure><img class="img-full" src="images/user-img1@2x.png" alt=""></figure>
    <div class="details">
      <span>Khilan Haria</span>
      <samp>Founder at StartSmart</samp>
    </div>
  </div>
</div>

 */
