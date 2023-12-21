import Link from "next/link";
import Image from "next/image";

const HomeInstructorBlock = () => {
  return (
    <div className="instructor-block">
      <div className="container">
        <div className="block-group">
          <div className="block instructor">
            <figure>
              <img className="img-full" src="/images/become-instroctor2x.webp" alt="" />
            </figure>
            <div className="content">
              <div className="title">
                <span>Become Our</span> Instructor
              </div>
              <p>
                Are you a certified professional and passionate about teaching and training? Join
                our Top Instructors Team from around the world and use your love for teaching to
                change the lives of millions.
              </p>
              <Link href="/become-an-instructor">
                <a className="btn" target="_blank">Start Teaching Today</a>
              </Link>
            </div>
            <div className="shape">
              <img src="/images/insrtructor-bg-lines.svg" alt="" />
            </div>
          </div>
          <div className="block business">
            <figure>
              <img className="img-full" src="/images/whizlabs-business2x.webp" alt="" />
            </figure>
            <div className="content">
              <div className="title">
                <span>Whizlabs for </span> Business
              </div>
              <p>
                Planning to upskill your employees and build a culture of learning in your
                organization? Get unlimited access to 500+ Whizlabs Top Courses at affordable prices
                for your team.
              </p>
              <Link href="https://business.whizlabs.com/">
                <a target="_blank" rel="noopener" className="btn btn-white">
                  Get Started Now
                </a>
              </Link>
            </div>
            <div className="shape">
              <img src="/images/whizlabs-business-bg-lines.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstructorBlock;
