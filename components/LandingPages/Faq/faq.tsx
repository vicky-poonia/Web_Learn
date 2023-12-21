
import styles from "./Faq.module.css"
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";

const Faq = ({pageContent})=>{
    useEffect(()=>{
      setfaq(JSON.parse(pageContent.faq_content))
    },[pageContent])
    const [faq,setfaq] = useState([])
    const [expanded, setExpanded] = useState("panel0");

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    return <>
        <div className="container">
            <div className={styles.title}>
                Frequently Asked Questions
            </div>
            <div className={styles.faq_block}>
            {
                faq.map((itm,i)=>{
                    return             <>
                    <Accordion
                    style={{margin:"12px 0px"}}
                      expanded={expanded === `panel${i}`}
                      onChange={handleChangeAccordion(`panel${i}`)}
                    >
                      <AccordionSummary
                        className={styles.summary}
                       expandIcon={<ExpandMoreIcon 
                        style={expanded == `panel${i}`?{transform:"rotate(180deg)"}:{}}
                       />}
                      >
                          <div className={styles.question}>
                          {itm.question}
                          </div>
                      </AccordionSummary>
                      <AccordionDetails
                        className={styles.deatils}
                      >
                        <div className={styles.answers} 
                          dangerouslySetInnerHTML={{
                            __html:itm.answer
                          }}
                        >

                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                })
            }
            </div>
        </div>
    </>
}

export default Faq;