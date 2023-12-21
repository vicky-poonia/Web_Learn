import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

const Categories = ({ data }) => {
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
    slidesPerView: isBreakpoint ? 1 : 5,
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      {/* <!-- explore-catogary --> */}
      <div className="explore-category">
        <div className="container" style={{ position: "relative" }}>
          <div className="block-heading">
            <h2>Explore by Category</h2>
            <Link href="/library/">
              <a target="_blank">
                Browse All<i className="icon-font-arrow-right"></i>
              </a>
            </Link>
          </div>
          <div className="category-group keen-slider" ref={sliderRef}>
            {data.map((cat) => (
              // <Link href={"/" + cat.slug + "/"} key={cat.id}>
                <div className="category keen-slider__slide" onClick={(e)=>{
                  e.preventDefault()
                  window.open(`/${cat.slug}/`)
                }}>
                  <div className="title">{cat.title}</div>
                  <figure>
                    <img className="img-full" src={cat.imgUrl} alt={cat.title} />
                  </figure>
                  <hr />
                  <p>{cat.content}</p>
                </div>
              // </Link>
            ))}
          </div>
          {slider && isBreakpoint && (
            <div className="dots">
              {[...Array(slider.details().size).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      slider.moveToSlideRelative(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
