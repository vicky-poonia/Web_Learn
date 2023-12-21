import { connect, useSelector } from "react-redux";
import { searchAllCourses } from "redux/SearchAllCourses/search-actions";
import { Keyword } from "@/services/reseller-services/services";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import cookie from 'js-cookie';

const HeaderSearch = ({ userData, searchCourses, searchCourse, isOpen = false, setHeaderSearchOpen }) => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (isOpen) {
      document.querySelector("header .icon-search").classList.add("active");
      document.querySelector(".header-search").classList.add("active");
      document.body.classList.add("header-search-open");
      document.body.classList.add("no-scroll");
      setTimeout(() => {
        document.querySelector<HTMLInputElement>("#searchBarInput").focus();
      }, 500);
    } else {
      setSearchInput("");
      document.querySelector("header .icon-search").classList.remove("active");
      document.querySelector(".header-search").classList.remove("active");
      document.body.classList.remove("header-search-open");
      document.body.classList.remove("no-scroll");
      document.querySelector(".header-search").classList.remove("show-content");
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    // if search input has one character, it will remove show-content class
    if (searchInput.length === 1) {
      document.querySelector(".header-search").classList.remove("show-content");
    }
  }, [searchInput]);

  function boldString(str, find) {
    var reg = new RegExp("(" + find + ")", "gi");
    return str.replace(reg, "<b>$1</b>");
  }

  const finalCourseList = searchCourses.map((a) => {
    if (a.seo_details.title && searchInput) {
      let str = boldString(a.seo_details.title, searchInput);
      a.seo_details.title = str;
    }
    return a;
  });

  const closeModal = () => {
    setHeaderSearchOpen(false);
    setSearchInput("");
    setLoading(false);
  };
  
  useEffect(()=>{
    const closeSO = (e) =>{
      if(isOpen && inputRef.current && !inputRef.current.contains(e.target)){
        setHeaderSearchOpen(false);
      }
    }
    document.body.addEventListener("click", closeSO);
    return ()=>{
      document.body.removeEventListener("click", closeSO)
    }
  }, [isOpen])

  const searchResults = useSelector((state: any) => state.searchAllCourses.searchCourses);
  const searchText = useSelector((state: any) => state.searchAllCourses.searchValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length >= 3 && searchText.length <= 30 && !searchResults.length) {
        let count  = finalCourseList.length > 0 ? 1 : 0;
        let user_id = userData ? userData?.data?.user_id : 0;
        Keyword(searchText,count,user_id);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [searchText, searchResults]);

  const handleInput = (value) => {
    setSearchInput(value);
    if (value.length >= 3) {
      document.querySelector(".header-search").classList.add("show-content");
      setLoading(true);
      searchCourse(value);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className={`header-search ${cookie.get("signupmodal") ? 'background-blurr' : ''}`}>
        <div className="header-search-inner">
          <div className="container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="seach-box">
                <img
                  src="/images/loader.svg"
                  className={loading ? "header_search__loader active" : "header_search__loader"}
                />
                <input
                  ref={inputRef}
                  id="searchBarInput"
                  type="text"
                  placeholder="Search from our training library…"
                  value={searchInput}
                  onChange={(e) => handleInput(e.target.value)}
                />
                <div className="icon-search icon icon-font-search"></div>
                <div className="icon-close icon icon-font-cross" onClick={() => closeModal()}></div>
              </div>
              {finalCourseList.length > 0 ? (
                <div className="search-content">
                  <div className="content courses">
                    <div className="title">Courses</div>
                    <ul>
                      {finalCourseList.map((item, index) => (
                        <React.Fragment key={index.toString()}>
                          {index < 8 && item.seo_details ? (
                            <li onClick={() => closeModal()}>
                              <Link href={"/" + item.seo_details.slug} key={index.toString()}>
                                <a
                                  dangerouslySetInnerHTML={{
                                    __html: item.seo_details.title,
                                  }}
                                ></a>
                              </Link>
                            </li>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                    {/* {finalCourseList.length > 8 ? (
                      <Link href="/library" onClick={() => closeModal()}>
                        <a className="see-more-link">See more results</a>
                      </Link>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCourse: (value) => dispatch(searchAllCourses(value)),
  };
};

export default connect(null, mapDispatchToProps)(HeaderSearch);
