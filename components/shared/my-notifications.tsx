import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MyNotifications = ({ tabActive, profile, userId, alertBox }) => {
  const [datas, setDatas] = useState({
    courses_and_labs_newsletter_and_updates: false,
    discount_and_special_offers: false,
    course_reminder: false,
    updated_the_course_and_labs: false,
    add_new_courses_and_labs: false,
    subscription_expired: false,
  });

  useEffect(() => {
    setDatas({
      courses_and_labs_newsletter_and_updates:
        profile?.user_preferences?.notification_settings?.courses_and_labs_newsletter_and_updates,
      discount_and_special_offers:
        profile?.user_preferences?.notification_settings?.discount_and_special_offers,
      course_reminder: profile?.user_preferences?.notification_settings?.course_reminder,
      updated_the_course_and_labs:
        profile?.user_preferences?.notification_settings?.add_new_courses_and_labs,
      add_new_courses_and_labs:
        profile?.user_preferences?.notification_settings?.add_new_courses_and_labs,
      subscription_expired: profile?.user_preferences?.notification_settings?.subscription_expired,
    });
  }, [profile]);

  const CheckBoxChange = (event) => {
    event.persist();
    setDatas((datas) => ({
      ...datas,
      [event.target.name]: event.target.checked ? true : false,
    }));
  };

  const submitNotificationForm = async (e) => {
    e.preventDefault();
    const response = await axios.put(baseUrl + "/users/profile/" + userId, {
      user_preferences: {
        notification_settings: datas,
      },
    });
    if (response && response.data.status && response.data.status === 1) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Notification settings updated.",
      });
    }
  };

  return (
    <div style={{ display: tabActive ? "block" : "none" }} id="notifications">
      <div className="container">
        <div className="acc-notfication">
          <div className="white-box">
            <div className="head-section">Get notified of activity at Whizlabs</div>
            <div className="box-content">
              <form onSubmit={submitNotificationForm}>
                <ul style={{listStyle:"none"}}>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="courses_and_labs_newsletter_and_updates"
                        checked={datas.courses_and_labs_newsletter_and_updates}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Courses and Labs Newsletter and Updates</span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="discount_and_special_offers"
                        checked={datas.discount_and_special_offers}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Discount and Special Offers</span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="course_reminder"
                        checked={datas.course_reminder}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Course Reminder</span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="updated_the_course_and_labs"
                        checked={datas.updated_the_course_and_labs}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Updated the Course and Labs</span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="add_new_courses_and_labs"
                        checked={datas.add_new_courses_and_labs}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Add new Courses and Labs</span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => CheckBoxChange(e)}
                        name="subscription_expired"
                        checked={datas.subscription_expired}
                      />
                      <span className="checkbox-style"></span>
                      <span className="name">Subscription Expired</span>
                    </label>
                  </li>
                </ul>
                <button className="btn btn-save">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotifications;
