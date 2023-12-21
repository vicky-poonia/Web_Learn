import { useEffect } from "react";

const Wallet = () => {

    useEffect(() => {
        document.getElementById("wrapper").classList.add("dashboard-page");
      }, []);


    return (
        		<div id="content-area" className="bg-color wallet-page">
			{/* <!-- sub header --> */}
			<div className="sub-header">
				<div className="container">
					<div className="left">
						<div className="breadcrumbs">
							<ul>
								<li><a href="Javascript:void(0)">Home</a></li>
								<li><a href="Javascript:void(0)">Refer a Friend</a></li>
							</ul>
						</div>
						<h1>Wallet</h1>
					</div>
				</div>
			</div>

			<div className="dashboard-tab">
				<div id="dashboard-tab">
					<div className="wrapper-list">
						<div className="container">
							<span className="previous">&lt;</span>
							<ul className="resp-tabs-list tabs-page-link hor_1 tab_list">
								<li>Refer a Friend</li>
								<li>Earnings</li>
							</ul>
							<span className="next">&gt;</span>
						</div>
					</div>
					<div className="tab-wrap">
						<div className="resp-tabs-container hor_1 content_wrapper-tab">
							<div className="tab_content active" id="tab-referfriend">
								<div className="container">
									<div className="white-box">
										<div className="left">
											<div className="head">
												<h2>Earn while Learn!</h2>
												<p>Refer your friend and <strong>Earn 25%</strong> of the purchasing amount in your wallet on your friend’s first purchase and your friend will <strong>get 5%</strong> of the purchasing amount in his Whizlabs Wallet. <a href="#">Terms Apply</a></p>
											</div>
											<div className="recomended-block">
												<div className="block-title">Recommend your friends </div>
												<form action="#">
													<div className="input-box-group">
														<div className="input-box">
															<input type="text" className="multi-filled bg-ghostwhite" />
														</div>
														<div className="input-box">
															<div className="custom-selectbox">
																<select>
																	<option>Whizlabs All Course</option>
																	<option>Aws</option>
																	<option>Cloud Compluting</option>
																	<option>Java</option>
																	<option>Python</option>
																	<option>PHP</option>
																</select>
															</div>
														</div>
													</div>
													<div className="plan-checkbox">
														<label className="custom-checkbox">
															<input type="checkbox" />
															<span className="checkbox-style"></span>
														</label>
														<div>Subscription Plan - <strong>$99 USD</strong><span> (Unlimited access to All training courses and Hands-on labs)</span></div>
													</div>
													<button className="btn btn-send">Send Invites</button>
												</form>
											</div>
											<div className="share-link-block">
												<div className="block-title">Share your invite unique link</div>
												<div className="block-content">
													<div className="input-block">
														<input type="text" value="https://www.whizlabs.com/dharmesh/r467547" />
														<div className="btn-copy">Copy</div>
													</div>
													<div className="all-links">
														<a href="#"><img className="img-full" src="/images/facebook-round.svg" alt="facebook"/></a>
														<a href="#"><img className="img-full" src="/images/twitter-round.svg" alt="twitter"/></a>
														<a href="#"><img className="img-full" src="/images/linkedin-round.svg" alt="linkedin"/></a>
														<a href="#"><img className="img-full" src="/images/whatsapp-round.svg" alt="watsapp"/></a>
													</div>
												</div>
											</div>
										</div>
										<div className="right">
											<div className="earned-block">
												<div className="earn-price">$150<span>Total Earned</span></div>
												<a className="btn btn-purchase" href="#">Purchase Course</a>
												<a className="btn btn-withdraw" href="#">Withdraw Money</a>
											</div>
											<p>You can use/redeem the Wallet anytime whenever you’ll purchase the Whizlabs courses. Once you’ll reach $100, you’ll be able to withdraw the amount in your account.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="tab_content" id="tab-earning">
								<div className="container">
									<div className="white-box">
										<div className="earned-block">
											<div className="total">Total Earned<span>$150</span></div>
											<div className="btn-group">
												<a className="btn btn-purchase" href="#">Purchase Course</a>
												<a className="btn btn-withdraw" href="#">Withdraw Money</a>
											</div>
										</div>
										<div className="earned-table">
											<ul>
												<li className="heading">
													<div className="left">
														<div className="no" data-label="No">No</div>
														<div className="enrolled-date" data-label="Enrolled Date">Enrolled Date</div>
														<div className="user-enrolled" data-label="User Enrolled">User Enrolled</div>
														<div className="enrolled" data-label="Enrolled Email">Enrolled Email</div>
													</div>
													<div className="earned" data-label="Earned">Earned</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">1</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnsmith@gmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">2</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">Johnny Craston</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnnyton@hotmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">3</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">Bethany Rathbone</div>
														<div className="enrolled-email" data-label="Enrolled Email">bethany@rathbone.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">4</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">Maria Ramallo</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">5</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnsmith@gmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">6</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">Johnny Craston</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnnyton@hotmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">7</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">Bethany Rathbone</div>
														<div className="enrolled-email" data-label="Enrolled Email">bethany@rathbone.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">8</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">Maria Ramallo</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">9</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">10</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnnyton@hotmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">11</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">Bethany Rathbone</div>
														<div className="enrolled-email" data-label="Enrolled Email">bethany@rathbone.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">12</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">Maria Ramallo</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">13</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">14</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">Johnny Craston</div>
														<div className="enrolled-email" data-label="Enrolled Email">bethany@rathbone.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">15</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">Bethany Rathbone</div>
														<div className="enrolled-email" data-label="Enrolled Email">johnnyton@hotmail.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">16</div>
														<div className="enrolled-date" data-label="Enrolled Date">15 Sep, 2018</div>
														<div className="user-enrolled" data-label="User Enrolled">Maria Ramallo</div>
														<div className="enrolled-email" data-label="Enrolled Email">bethany@rathbone.com</div>
													</div>
													<div className="earned" data-label="Earned">$25</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">17</div>
														<div className="enrolled-date" data-label="Enrolled Date">25 Mar, 2019</div>
														<div className="user-enrolled" data-label="User Enrolled">John Smith</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$13</div>
												</li>
												<li>
													<div className="left">
														<div className="no" data-label="No">18</div>
														<div className="enrolled-date" data-label="Enrolled Date">12 Sep, 2020</div>
														<div className="user-enrolled" data-label="User Enrolled">Johnny Craston</div>
														<div className="enrolled-email" data-label="Enrolled Email">maria.ramallo@yahoo.com</div>
													</div>
													<div className="earned" data-label="Earned">$15</div>
												</li>
											</ul>
										</div>
									</div>
									<div className="pagination-block">
										<a className="arrow disabled back-arrow icon-font-pagination-arrow" href="#"></a>
										<ul>
											<li className="active"><a href="#">1</a></li>
											<li><a href="#">2</a></li>
											<li><a href="#">3</a></li>
											<li><a href="#">4</a></li>
											<li><a href="#">...</a></li>
											<li><a href="#">30</a></li>
										</ul>
										<a className="arrow right-arrow icon-font-pagination-arrow" href="#"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )

}

export default Wallet;