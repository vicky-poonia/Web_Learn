
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fade from "react-reveal";
import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
const LabsLibrary = ({ courseLevelLab, productTypeListLab, categoryListLab }) => {
  let Url = process.env.NEXT_PUBLIC_PLAY_URL;
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [winwidth, setwinwidth] = useState(0)
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedProductTypes, setCheckedProductTypes] = useState([]);
  const [checkedCourseLevels, setCheckedCourseLevels] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [task, setTask] = useState([])
  const [taskdetail,setTaskdetail] = useState([])
  const [loading,setLoading] = useState(false)
  const getTaskdetail = async () => {
    await axios
      .post(`https://play.whizlabs.com/api/web/lab/play-get-tasks-list`, { search_title: "" })
      .then((resp) => {
        setTaskdetail(resp.data.data.tasks);
        setLoading(false)
      });
  };
  useEffect(()=>{
    setLoading(true)
    getTaskdetail()
  },[])
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
    if (
      checkedCategories?.length > 0 ||
      checkedProductTypes?.length > 0 ||
      checkedCourseLevels?.length > 0
    ) {
      let finalArray = taskdetail;
      if (checkedCategories.length > 0) {
        let finaltask = finalArray.filter((task) => {
          return checkedCategories.indexOf(task.lab_type) > -1;
        })
        finalArray = finaltask
      }
      if (checkedProductTypes.length > 0) {
        let finaltask = finalArray.filter((task) => {
          return checkedProductTypes.indexOf(task.lab_category) > -1
        })
        finalArray = finaltask
      }
      if (checkedCourseLevels.length > 0) {
        let finaltask = finalArray.filter((task) => {
          return checkedCourseLevels.indexOf(task.task_level) > -1
        })
        finalArray = finaltask
      }
      setTask(finalArray)
    }
    else {
      setTask(taskdetail)
    }
  }, [checkedCategories, checkedProductTypes, checkedCourseLevels,taskdetail])

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

  const handleProductTypesFilterChange = (value) => {
    const currentIndex = checkedProductTypes.indexOf(value);
    const newChecked = [...checkedProductTypes];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedProductTypes(newChecked);
  };

  const handleCourseLevelFilterChange = (value) => {
    const currentIndex = checkedCourseLevels.indexOf(value);
    const newChecked = [...checkedCourseLevels];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedCourseLevels(newChecked);
  };

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleFilterClear = () => {
    setCheckedCategories([]);
    setCheckedProductTypes([]);
    setCheckedCourseLevels([]);
  };
  const findduration = (time) => {
    let hour = (time / 3600).toString();
    let min_cal = ((parseFloat(hour) % 1) * 60).toString();
    let sec_cal = ((parseFloat(min_cal) % 1) * 60).toString();
    let obj = {
      hours: parseInt(hour) > 0 ? `0${parseInt(hour)}` : "00",
      min: parseInt(min_cal) < 60 ? parseInt(min_cal) < 10 ? `0${parseInt(min_cal)}` : `${parseInt(min_cal)}` : "00",
      sec: parseInt(sec_cal) < 60 ? parseInt(sec_cal) < 10 ? `0${parseInt(sec_cal)}` : `${parseInt(sec_cal)}` : "00"
    }
    return obj;
  }
  const findLabtype = (type) => {
    switch (type) {
      case 1:
        return "Guided Lab"
      case 2:
        return "Lab Challenge"
      case 3:
        return "Lab Project"
    }
  }
  const findLabicon = (type) => {
    switch (type) {
      case 1:
        return "aws-lab.svg"
      case 2:
        return "azure-lab.svg"
      default:
        return "gcp-lab.svg"
    }
  }
  return (
    <>
      <div id="content-area" className="bg-color category-page">
        <div className="two-column">
          <div className="container">
            <div className="left-column">
              <div className="filter-bar">
                <div className="filter-head">
                  <div className="title">
                    Filters (
                    {checkedCategories.length +
                      checkedProductTypes.length +
                      checkedCourseLevels.length}
                    )
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
                      {
                        !loading && <ul className="item-content cat-list-lib" style={{ width: "100%" }}>
                        {categoryListLab.map((data) => (
                          <li
                            key={data.id}
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
                                onChange={() => handleCategoriesFilterChange(data.id)}
                                checked={checkedCategories.includes(data.id) ? true : false}
                              />
                              <span className="checkbox-style"></span>
                              <samp className="name">{data.categoryName}</samp>
                            </label>
                          </li>
                        ))}
                      </ul>
                      }
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    defaultExpanded={false}
                    expanded={expanded === "panel2"}
                    onChange={handleChangeAccordion("panel2")}
                  >
                    <AccordionSummary
                      aria-controls={"panel1d-content1"}
                      id={"panel1d-header1"}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div className="item">
                        <div className="filtername">Type</div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        !loading &&    <ul className="item-content prod-list-lib" style={{ listStyle: "none" }}>
                        {productTypeListLab.map((data, i) => (
                          <li
                            key={i}
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
                                onChange={() => handleProductTypesFilterChange(data.id)}
                                checked={checkedProductTypes.includes(data.id) ? true : false}
                              />
                              <span className="checkbox-style"></span>
                              <samp className="name">{data.name}</samp>
                            </label>
                          </li>
                        ))}
                      </ul>
                      }
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    defaultExpanded={false}
                    expanded={expanded === "panel3"}
                    onChange={handleChangeAccordion("panel3")}
                  >
                    <AccordionSummary
                      aria-controls={"panel1d-content1"}
                      id={"panel1d-header1"}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div className="item">
                        <div className="filtername">Levels</div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        !loading && <ul className="item-content prod-list-lib" style={{ listStyle: "none" }}>
                        {courseLevelLab.map((data, i) => (
                          <li
                            key={i}
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
                                onChange={() => handleCourseLevelFilterChange(data.id)}
                                checked={checkedCourseLevels.includes(data.id) ? true : false}
                              />
                              <span className="checkbox-style"></span>
                              <samp className="name">{data.name}</samp>
                            </label>
                          </li>
                        ))}
                      </ul>
                      }
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
                  <h2 className="title">Labs to get you started</h2>
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
                            <i className="icon icon-font-equalizer" style={{ margin: "0px" }}></i>
                            Filters (
                            {checkedCategories.length +
                              checkedProductTypes.length +
                              checkedCourseLevels.length}
                            )
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
                              {checkedCategories.length +
                                checkedProductTypes.length +
                                checkedCourseLevels.length}
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
                               {
                                !loading &&  <ul className="item-content cat-list-lib" style={{ width: "100%" }}>
                                {categoryListLab.map((data) => (
                                  <li key={data.id}>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => handleCategoriesFilterChange(data.id)}
                                        checked={
                                          checkedCategories.includes(data.id) ? true : false
                                        }
                                      />
                                      <span className="checkbox-style"></span>
                                      <samp className="name">{data.categoryName}</samp>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                               }
                              </AccordionDetails>
                            </Accordion>

                            <Accordion square defaultExpanded={true}>
                              <AccordionSummary
                                aria-controls={"panel1d-content1"}
                                id={"panel1d-header1"}
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <div className="item">
                                  <div className="filtername">Type</div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                               {
                                !loading && <ul
                                className="item-content prod-list-lib"
                                style={{ listStyle: "none" }}
                              >
                                {productTypeListLab.map((data, i) => (
                                  <li key={i}>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => handleProductTypesFilterChange(data.id)}
                                        checked={
                                          checkedProductTypes.includes(data.id) ? true : false
                                        }
                                      />
                                      <span className="checkbox-style"></span>
                                      <samp className="name">{data.name}</samp>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                               }
                              </AccordionDetails>
                            </Accordion>

                            <Accordion square defaultExpanded={true}>
                              <AccordionSummary
                                aria-controls={"panel1d-content1"}
                                id={"panel1d-header1"}
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <div className="item">
                                  <div className="filtername">Levels</div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                               {
                                !loading && <ul
                                className="item-content prod-list-lib"
                                style={{ listStyle: "none" }}
                              >
                                {courseLevelLab.map((data, i) => (
                                  <li key={i}>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => handleCourseLevelFilterChange(data.id)}
                                        checked={
                                          checkedCourseLevels.includes(data.id) ? true : false
                                        }
                                      />
                                      <span className="checkbox-style"></span>
                                      <samp className="name">{data.name}</samp>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                               }
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {loading && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                        marginBottom: "50px",
                      }}
                    >
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      />
                    </div>
                  </>
                )}
                <div className="list-group">
                  {task &&
                    task.length > 0 &&
                    task.map((itm, idx) => {
                      let time_object = findduration(itm.task_duration);
                      let lab_type = findLabtype(itm.lab_category);
                      let lab_icon = findLabicon(itm.lab_type);
                      return (
                        <>
                          <Fade bottom key={idx.toString()}>
                            <div className="list-item" style={{ marginBottom: "10px" }}>
                              <div
                                className="couser-img"
                                style={{ position: "relative", cursor: "pointer" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(`${Url}/${itm.task_slug}`);
                                }}
                              >
                                <div className="up-box-group">
                                  <div className="left">
                                    <label className="new Updated">{lab_type}</label>
                                  </div>
                                  <div className="right">
                                    <figure>
                                      <img className="img-full" src={`/images/${lab_icon}`}></img>
                                    </figure>
                                  </div>
                                </div>
                                <div className="point-time-group">
                                  <div className="left">
                                    <figure>
                                      <img
                                        className="img-full"
                                        src="/images/pintlab.svg"
                                        alt=""
                                        width="16"
                                        height="16"
                                      />
                                    </figure>
                                    <span>
                                      {itm.deduct_point != 0 ? (
                                        <>{itm.deduct_point} Points</>
                                      ) : (
                                        <>Free</>
                                      )}
                                    </span>
                                  </div>
                                  <div className="right">
                                    <figure>
                                      <img
                                        className="img-full"
                                        src="/images/clocklab.svg"
                                        alt=""
                                        width="16"
                                        height="16"
                                      />
                                    </figure>
                                    <span>
                                      {time_object.hours}:{time_object.min}:{time_object.sec}
                                    </span>
                                  </div>
                                </div>
                                <img
                                  className="img-full"
                                  src={
                                    itm.lab_category == 2
                                      ? "/images/lablib1.png"
                                      : "/images/lablib.png"
                                  }
                                ></img>
                              </div>

                              <div className="caption-group">
                                <div className="caption">
                                  <div className="label-complet">
                                    <div className="sub-label">
                                      Level:&nbsp;
                                      {itm.task_level == 1 && (
                                        <>
                                          <span>Fundamental</span>
                                        </>
                                      )}
                                      {itm.task_level == 2 && (
                                        <>
                                          <span>Intermediate</span>
                                        </>
                                      )}
                                      {itm.task_level == 3 && (
                                        <>
                                          <span>Advanced</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="title"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window.open(`${Url}/${itm.task_slug}`);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <a>{itm.task_name}</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fade>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabsLibrary;