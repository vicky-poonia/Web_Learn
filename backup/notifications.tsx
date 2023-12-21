const Notifications = () => {
  return (
    <div id="content-area" className="bg-color">
      {/* <!-- sub header --> */}
      <div className="sub-header">
        <div className="container">
          <div className="left">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a href="Javascript:void(0)">Home</a>
                </li>
                <li>
                  <a href="Javascript:void(0)">Notifications</a>
                </li>
              </ul>
            </div>
            <h1>Notifications</h1>
          </div>
          <div className="right">
            <a href="#">Change Settings</a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="notification-block">
          <ul>
            <li className="unread">
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Resume your video course <a href="#">Java Spring Framework basics course</a>
                </p>
                <span>2 hours ago</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li className="unread">
              <div className="left">
                <i className="icon icon-font-chat-2"></i>
              </div>
              <div className="right">
                <p>
                  You have received a message from <a href="#"> “Adam Smith”</a> one of your connection.
                </p>
                <span>2 hours ago</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-chat-2"></i>
              </div>
              <div className="right">
                <p>
                  You have received a message from <a href="javascript:void(0)"> “Adam Smith”</a> one of your connection.
                </p>
                <span>1 week ago</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Complete your API Practice Tests 1 <a href="javascript:void(0)"> AWS Certified Cloud Practitioner</a>
                </p>
                <span>2 Jun, 2020</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Resume your video course <a href="javascript:void(0)">Java Spring Framework basics course</a>
                </p>
                <span>10 Jun, 2020</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Complete your API Practice Tests 1 <a href="javascript:void(0)"> AWS Certified Cloud Practitioner</a>
                </p>
                <span>25 Jun, 2020</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Resume your video course <a href="javascript:void(0)">Java Spring Framework basics course</a>
                </p>
                <span>1 week ago</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Complete your API Practice Tests 1 <a href="javascript:void(0)"> AWS Certified Cloud Practitioner</a>
                </p>
                <span>25 Jun, 2020</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Resume your video course <a href="javascript:void(0)">Java Spring Framework basics course</a>
                </p>
                <span>1 week ago</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
            <li>
              <div className="left">
                <i className="icon icon-font-notification2"></i>
              </div>
              <div className="right">
                <p>
                  Complete your API Practice Tests 1 <a href="javascript:void(0)"> AWS Certified Cloud Practitioner</a>
                </p>
                <span>25 Jun, 2020</span>
              </div>
              <div className="btn-close icon icon-font-cross-bold"></div>
            </li>
          </ul>
          <button className="btn btn-load-more">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
