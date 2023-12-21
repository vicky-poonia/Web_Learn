import Link from "next/link";
import Image from "next/image";

const HomeCourseBlock = () => {
  return (
    <div className="view-all-course-section">
      <div
        className="container"
        style={{ backgroundImage: "url('images/bg-img-all-course.webp')" }}
      >
        <div className="caption">
          <div className="title">
            Boost your skills with the help of Experienced and Certified Professionals, using our
            Unique Methods, and 24x7 Expert Support!
          </div>
          <Link href="/library">
            <a className="btn btn-start-now" target="_blank">
              View all Courses<i className="icon-font-arrow-right"></i>
            </a>
          </Link>
        </div>
        <div className="img-block">
          <figure>
            <img
              className="img-full"
              src="/images/view-all-course-section-img2x.webp"
              alt="view all Courses"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default HomeCourseBlock;
