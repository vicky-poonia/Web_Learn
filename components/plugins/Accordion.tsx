import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import React, { useState } from "react";

export const Accordions = ({ data }) => {
    const [expanded, setExpanded] = useState("");

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div className="item">
        <Accordion expanded={expanded === `panel${data.key}`}
         TransitionProps={{ unmountOnExit: true }}
        onChange={handleChange(`panel${data.key}`)}>
          <AccordionSummary className={expanded === `panel${data.key}` ? "item-head open":"item-head"}>
            <>
              <samp></samp>
              <span>{data.question}</span>
            </>
          </AccordionSummary>
          <AccordionDetails className="item-content">
            <div
              dangerouslySetInnerHTML={{
                __html: data.answer,
              }}
            ></div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};