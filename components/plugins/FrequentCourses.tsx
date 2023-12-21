import { StarRating } from "@/components/import";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "redux/AddToCart/cart-actions";
const FrequentCourses = ({
  cartData = null,
  freqCoursesData = null,
  addToCart
}) => {
  const [CoursesInCart, setCoursesInCart] = useState([]);
  useEffect(() => {
    if (cartData) {
      let newCoursesInCart = [];
      cartData.forEach((element) => {
        newCoursesInCart.push(element.courseId); // fetch course id from cart
      });
      setCoursesInCart(newCoursesInCart);
    }
  }, [cartData]);

  return (
    <>
      <div className="course-slider">
        <div className="container">
          <div className="heading">
            <h2 className="title">Frequently Bought Together</h2>
            <div className="discount-block">
              <figure>
                <img
                  className="img-full"
                  src="/images/offer-percentage.svg"
                  alt=""
                />
              </figure>
              <span>
                Buy all and get extra <strong>45% OFF</strong> discount
              </span>
            </div>
          </div>

          <div className="course-group owl-carousel owl-theme">
            {freqCoursesData.map((course) => (
              <div className="course" key={course.courseId}>
                <div className="couser-img">
                  <img className="img-full" src={course.courseImage} alt="" />
                </div>
                <div className="course-content">
                  <div className="course-details">
                    <h6 className="title">{course.courseName}</h6>
                    <div className="level-text">
                      <span>
                        Level:{" "}
                        {course.level === 1
                          ? "Beginner"
                          : course.level === 2
                          ? "Intermediate"
                          : "Advanced"}
                      </span>
                    </div>
                    <p>{course.categoryTitle}</p>
                  </div>
                  <div className="price-review-block">
                    <StarRating
                      avgRating={course.avgRatings}
                      totalRating={course.totalRatings}
                    />
                    <div className="price-block">
                      <span className="price">{course.oldPrice}</span>
                      <del className="old-price">{course.fixedPrice}</del>
                    </div>
                    {CoursesInCart.includes(course.courseId) ? (
                      <button
                        className="btn btn-add-cart"
                        style={{
                          background: "#259b1d"
                        }}
                        disabled
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart(course.courseId, course.courseType)
                        }
                        className="btn btn-add-cart"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, type) => dispatch(addToCart(id, type))
  };
};

export default connect(null, mapDispatchToProps)(FrequentCourses);
