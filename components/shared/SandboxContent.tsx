import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const AwsAccoBlock = (props) => {
  return (
    <div className="according-block">
      <label>{props?.service_name}</label>
      <div dangerouslySetInnerHTML={{ __html: props?.service_description }}></div>
    </div>
  );
};

const SandboxContent = ({ name, sandbox }) => {
  const [expandedIn, setExpandedIn] = React.useState("");

  const handleChangeIn = (panel) => (event, newExpanded) => {
    setExpandedIn(newExpanded ? panel : false);
  };

  return (
    <div className="aws-services-according">
      <div className="container">
        <h2 className="main-title">Allowed {name} Services and Limits</h2>
        <div className="inner-according">
          {sandbox.map((data, i) => {
            return (
              <Accordion key={i} expanded={true}>
                <AccordionSummary
                  className="according-head"
                  aria-controls={`panel${i}content`}
                  id="panel1d-header"
                >
                  <div className="intro-head">{data?.category_title}</div>
                  {/* <div className="acco-icon">
                    <div className="pluse-icon">
                      <span></span>
                    </div>
                  </div> */}
                </AccordionSummary>
                <div className="according-block-group">
                  {data?.services?.map((data1, i) => {
                    return <AwsAccoBlock key={i} {...data1} />;
                  })}
                </div>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SandboxContent;
