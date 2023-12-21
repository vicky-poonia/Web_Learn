import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Link from "next/link";
// import Group19 from "../Group19";
// import "./ExploreSection2.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function ExploreSection2(props) {
    const { forIndividuals, forBusiness, img1031, exploreNow } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="exploreSection">
            <div>
                <Tabs value={value} onChange={handleChange} aria-label="basictabs">
                    <Tab label="For Individuals"{...a11yProps(0)} />

                    <Tab label="For Business" {...a11yProps(1)} />
                </Tabs>

            </div>
            <TabPanel value={value} index={0}>
                <div className="explore-individual">
                    <div className="individualImage">
                        <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-hands-on-lab.webp`} alt="whizlabs hands on labs for aws microsoft azure google cloud" />
                    </div>
                    <div className="individualContent">
                        <div className="group-19">
                        <h1 className="custom-h1">Shape your skills<br />and transform<br />your career</h1>
                            <div className="listtext">
                                <img src="/images/pttest.png"alt="whizlabs hands on labs for aws microsoft azure google cloud"/>&nbsp;&nbsp;
                                <span>25,000+</span><span>&nbsp;</span><span>Practice Questions</span>
                            </div>
                            <div className="listtext">
                                <img
                                    src="/images/Vectoroxtest.png"
                                    alt="OC"
                                />&nbsp;&nbsp;
                                    <span >4500+</span>
                                    <span >&nbsp;</span>
                                    <span >Videos</span>
                            </div>
                            <div className="listtext">
                                <img
                                    className="labs-icons-1"
                                    src="/images/labstest.png"
                                    alt="lab"
                                />&nbsp;&nbsp;
                                    <span >750+</span>
                                    <span >&nbsp;</span>
                                    <span >Hands-on Labs</span>
                            </div>
                            <div className="listtext">
                                <img
                                    className="labs-icons-1"
                                    src="/images/labsSandbox5.png"
                                    alt="sandbox"
                                />&nbsp;&nbsp;
                                    <span ></span>
                                    {/* <span >&nbsp;</span> */}
                                    <span >Cloud Sandboxes</span>
                            </div>
                            <div>
                            <Link href="/library">
                                <button className="bannerButton"><b>Explore Now</b></button>
                            </Link>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <div className="explore-individual">
                    <div className="individualImage">
                        <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-upskilling.webp`} alt="upskilling employees on cloud devops microsoft aws google cloud" />
                    </div>
                    <div className="individualContent">
                        <div className="group-19">
                            <h1>upskill your <br />workforce <br />@5X SPEED</h1>
                            <div className="listtext">
                                <img src="/images/pttest.png"alt="PT"/>&nbsp;&nbsp;
                                <span>Create learning paths for your team</span>
                            </div>
                            <div className="listtext">
                                <img
                                    src="/images/Vectoroxtest.png"
                                    alt="OC"
                                />&nbsp;&nbsp;
                                    <span >Track your Team's Learning Progress</span>
                            </div>
                            <div className="listtext">
                                <img
                                    className="labs-icons-1"
                                    src="/images/labstest.png"
                                    alt="lab"
                                />&nbsp;&nbsp;
                                    <span >Fasten your on-boarding & upskilling requirements</span>
                            </div>
                            <div>
                            <a href={process.env.NEXT_PUBLIC_BUSINESS_URL} target="_blank">
                                <button className="bannerButton"><b>Explore Now</b></button>
                            </a>
                                {/* <button className="bannerButton"><a href={process.env.NEXT_PUBLIC_BUSINESS_URL}></a><b>Explore Now</b></button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
}

export default ExploreSection2;
