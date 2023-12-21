import { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
const AccordianFaq = ({ data, panel }) => {
    const [expanded, setExpanded] = useState(panel);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return <>
        <div className="item">
            {data.map((item, ie) => {
                if(item.answer !== null && item.question !=null)
                {
                    return <>
                    <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        key={ie}
                        expanded={expanded === `panel` + ie}
                        onChange={handleChangeAccordion(`panel` + ie)}>
                        <AccordionSummary className="item-head"
                           aria-controls={"panel1d-content" + ie}
                           id={"panel1d-header" + ie}
                         expandIcon={expanded=== "panel"+ie ?<RemoveOutlinedIcon/>:<AddOutlinedIcon/>}
                        >
                            <>
                            <div style={{margin:"0px"}}>
                            <span>{item.question}</span>
                            </div>
                            </>
                        </AccordionSummary>
                        <AccordionDetails className="item-content">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.answer,
                                }}
                            ></div>
                        </AccordionDetails>
                    </Accordion>
                </>   
                }
            })}
        </div>
    </>
}

export default AccordianFaq;