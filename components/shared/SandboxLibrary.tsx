import Fade from "react-reveal";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
const SandboxLibrary = ({ data }) => {
    let Url = process.env.NEXT_PUBLIC_PLAY_URL;
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const [winwidth, setwinwidth] = useState(0)
    const [clicked, setclicked] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [sandboxdata, setsandboxdata] = useState([])
    useEffect(() => {
        if (window) {
            setwinwidth(window.innerWidth);
        }
        const handlesize = () => {
            setwinwidth(window.innerWidth);
        };
        window.addEventListener("resize", handlesize);
        return () => {
            window.removeEventListener("resize", handlesize);
        };
    }, []);

    useEffect(() => {
        if (checkedCategories.length > 0) {
            let finalarray = data;
            let final_sbdata = finalarray.filter((itm) => {
                return checkedCategories.indexOf(itm.id) > -1
            })
            setsandboxdata(final_sbdata)
        }
        else {
            setsandboxdata(data)
        }
    }, [checkedCategories])

    const handleCategoriesFilterChange = (value) => {
        const currentIndex = checkedCategories.indexOf(value);
        const newChecked = [...checkedCategories];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedCategories(newChecked);
    };

    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleFilterClear = () => {
        setCheckedCategories([]);
    }
    return <>
        <div id="content-area" className="bg-color category-page">
            <div className="two-column">
                <div className="container">
                    <div className="left-column">
                        <div className="filter-bar">
                            <div className="filter-head">
                                <div className="title">
                                    Filters (
                                    {checkedCategories.length})
                                </div>
                                <div className="btn-clear" onClick={() => handleFilterClear()}>
                                    Clear
                                </div>
                                <div className="icon-close icon icon-font-cross"></div>
                            </div>
                            <div className="filters-group">
                                <Accordion
                                    square
                                    defaultExpanded={true}
                                    expanded={expanded === "panel1"}
                                    onChange={handleChangeAccordion("panel1")}
                                >
                                    <AccordionSummary
                                        aria-controls={"panel1d-content0"}
                                        id={"panel1d-header0"}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <div className="item">
                                            <div className="filtername">Categories</div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul className="item-content cat-list-lib" style={{ width: "100%" }}>
                                            {data.map((itm) => (
                                                <li
                                                    key={itm.id}
                                                    onClick={(e) => {
                                                        // e.preventDefault()
                                                        if (window) {
                                                            window.scrollTo({
                                                                top: 64,
                                                                left: 0,
                                                                behavior: "smooth",
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <label className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCategoriesFilterChange(itm.id)}
                                                            checked={checkedCategories.includes(itm.id) ? true : false}
                                                        />
                                                        <span className="checkbox-style"></span>
                                                        <samp className="name">
                                                            {itm.title}
                                                        </samp>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>

                            </div>
                            <div className="button">
                                <button className="btn" onClick={() => handleFilterClear()}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="course-listing">
                            <div className="heading">
                                <h2 className="title">Sandboxes to get you started</h2>
                                <div className="right-part">
                                    <div className="total-course">
                                        {/* <strong>{courses?.length}</strong> courses */}
                                    </div>
                                    <div className="mobile-filter-sortby">

                                        {winwidth < 1024 && (
                                            <>
                                                <div
                                                    className="library-filter"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!clicked) {
                                                            setclicked(true);
                                                        } else {
                                                            setclicked(false);
                                                        }
                                                    }}
                                                >
                                                    <i
                                                        className="icon icon-font-equalizer"
                                                        style={{ margin: "0px" }}
                                                    ></i>
                                                    Filters (
                                                    {checkedCategories.length})
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {clicked && (
                                <>
                                    <div className="overlay-library">
                                        <div
                                            className="transparent"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setclicked(false);
                                            }}
                                        ></div>
                                        <div className="content">
                                            <div className="filter-bar">
                                                <div className="filter-head">
                                                    <div className="title">
                                                        Filters (
                                                        {checkedCategories.length}
                                                        )
                                                    </div>
                                                    <div className="btn-clear" onClick={() => handleFilterClear()}>
                                                        Clear
                                                    </div>
                                                    <div
                                                        className="icon-close icon icon-font-cross"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setclicked(false);
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" onClick={() => handleFilterClear()}>
                                                        Clear
                                                    </button>
                                                </div>
                                                <div className="filters-group">
                                                    <Accordion square defaultExpanded={true}>
                                                        <AccordionSummary
                                                            aria-controls={"panel1d-content0"}
                                                            id={"panel1d-header0"}
                                                            expandIcon={<ExpandMoreIcon />}
                                                        >
                                                            <div className="item">
                                                                <div className="filtername">Categories</div>
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <ul
                                                                className="item-content cat-list-lib"
                                                                style={{ width: "100%" }}
                                                            >
                                                                {data.map((itm) => (
                                                                    <li key={itm.id}>
                                                                        <label className="custom-checkbox">
                                                                            <input
                                                                                type="checkbox"
                                                                                onChange={() => handleCategoriesFilterChange(itm.id)}
                                                                                checked={
                                                                                    checkedCategories.includes(itm.id) ? true : false
                                                                                }
                                                                            />
                                                                            <span className="checkbox-style"></span>
                                                                            <samp className="name">
                                                                                {itm.title}
                                                                            </samp>
                                                                        </label>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="list-group">
                                {
                                    sandboxdata.map((itm, idx) => {
                                        return <>
                                            <Fade bottom key={idx.toString()}>
                                            <div className="list-item">
                                    <div className="couser-img"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            window.open(`${Url}${itm.slug}`)
                                        }}
                                    > 
                                      <img
                                        className="img-full"
                                        src={`/images/${itm.icon}`}
                                        style={{width:"168px",padding:"28px"}}
                                      />
                                    </div>
                                    <div className="item-content">
                                      <div className="course-details">
                                        <a href={`${Url}${itm.slug}`} target="_blank">
                                          <h3 className="title">
                                            <a target="_blank">{itm.title}</a>
                                          </h3>
                                        </a>
                                        <div className="description">
                                          <p>
                                            {itm.description}
                                          </p>
                                        </div> 
                                      </div>
                                    </div>
                                  </div>
                                            </Fade>
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SandboxLibrary;