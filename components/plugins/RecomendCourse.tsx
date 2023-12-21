import { useState } from "react";
import { ComingSoonNotifyModal } from "../shared/Modals";

const RecomendCourse = ({ alertBox, userData, course_id, course_type }) => {
  const [comingSoonOrNotifyData, setComingSoonOrNotifyData] = useState({
    course_id: null,
    course_type: null,
    user_email: null,
    type: "NOTIFY",
  });

  const openComingSoonOrNotifyModal = (e) => {
    e.preventDefault();
    setComingSoonOrNotifyData({
      course_id: course_id,
      course_type: course_type,
      user_email: userData && userData.data && userData.data.user_email ? userData.data.user_email : null,
      type: "NOTIFY",
    });
    document.querySelector("body").classList.add("open-modal-notify");
  };

  return (
    <>
      <ComingSoonNotifyModal data={comingSoonOrNotifyData} alertBox={alertBox} userData={undefined} updateNotified={undefined} />
      {/* <!-- recommand-block --> */}
      <div className="recommand-block">
        <div className="container">
          <div className="container-left">
            <p>
              Recommend this cart to a friend / colleague?
              <a className="reccomend-click" style={{ cursor: "pointer" }} onClick={(e) => openComingSoonOrNotifyModal(e)}>
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecomendCourse;
