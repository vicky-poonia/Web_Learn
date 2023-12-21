import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Menu = ({
  logout,
  userData,
  setMenuOpen,
  menuOpen,
  menusList = [],
  handleSignIn,
  handleSignUp,
}) => {
  const listLimit = 16;
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    const finalListMap = menusList.map((a) => {
      let icon = JSON.parse(JSON.stringify(a.icon));
      a.icon_name = icon ? icon.icon : null;
      a.class_name = "detail";
      a.children.map((b) => {
        if (b.children.length > 0) {
          a.class_name = "subtitle";
        } else {
          a.class_name = "detail";
        }
      });
      return a;
    });

    setFinalList(finalListMap);
  }, []);
  const closeMenuBar = () => {
    setMenuOpen(false);
    document.querySelector(".dropdown-menu").classList.remove("open");
  };
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    document.body.classList.remove('o-hidden');
  };

  return (
    <ul className="step-1">
      <MenuHtml finalList={finalList} listLimit={listLimit} closeMenuBar={closeMenuBar} />
      <li>
        <div className="nav-footer">
          <div className="title">More from Whizlabs</div>
          <ul>
            <li>
              <a href="https://play.whizlabs.com/" rel="noopener" target="_blank">
                Labs
              </a>
            </li>
            <li>
              <a href="https://business.whizlabs.com/" rel="noopener" target="_blank">
                Business
              </a>
            </li>
            <li>
              <a href={process.env.NEXT_PUBLIC_BASE_PATH + "subscription"}>Subscription</a>
            </li>
            <li>
              <a href="https://www.whizlabs.com/forums/" rel="noopener" target="_blank">
                Discussions
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

const MenuHtml = ({ finalList, listLimit, closeMenuBar }) => {
  // console.log(closeMenuBar,"check Menu")
  // console.log(finalList,"final console")
  const handleMoreCourseClick = (slug) => {
    Cookies.set("moreCourseSlug", slug);
  };
  return finalList.map((nav1, list1) => {
    return (
      <li key={list1}>
        <Link href={nav1.slug == null?"":process.env.NEXT_PUBLIC_BASE_PATH + nav1.slug}>
          <a onClick={closeMenuBar}>
            <i className={`icon ${nav1.icon_name}`}></i>
            <span>{nav1.name}</span>
            {nav1.children && nav1.children.length > 0 && (
              <i className="icon-nxt icon-font-submenu-arrow"></i>
            )}
          </a>
        </Link>
        {nav1.children && nav1.children.length > 0 && (
        <div className={`${nav1.menu_level === 2 ? "step_22" : "step-2"}`}>
          <ul className="step-2-menu">
            {nav1.children.map((nav2, list2) => {
              return (
                list2 < 15 && (
                  <li key={list2}>
                    {nav2.slug == "#" ?
                      <>
                      <a onClick={closeMenuBar}
                      // target={nav2.children && nav2.children.length == 0 ? "_blank" :""}
                      >
                        <span
                          className={
                            nav2.is_new
                              ? "new"
                              : nav2.is_popular
                              ? "popular"
                              : nav2.is_comingsoon
                              ? "coming-soon"
                              : ""
                          }
                        >
                          {nav2.name}
                        </span>
                        {nav2.children && nav2.children.length > 0 && (
                          <i className="icon-nxt icon-font-submenu-arrow"></i>
                        )}
                      </a>
                      </>
                    :
                      <>
                      <Link href={nav2.slug == "#" ?"": process.env.NEXT_PUBLIC_BASE_PATH + nav2.slug} >
                         <a onClick={closeMenuBar}
                         // target={nav2.children && nav2.children.length == 0 ? "_blank" :""}
                         >
                           <span
                             className={
                               nav2.is_new
                                 ? "new"
                                 : nav2.is_popular
                                 ? "popular"
                                 : nav2.is_comingsoon
                                 ? "coming-soon"
                                 : ""
                             }
                           >
                             {nav2.name}
                           </span>
                           {nav2.children && nav2.children.length > 0 && (
                             <i className="icon-nxt icon-font-submenu-arrow"></i>
                           )}
                         </a>
                       </Link>
                    </>
                    }
                    {nav2.children && nav2.children.length > 0 && (
                      <ul className={`step-3 `}>
                        {nav2.children.map((nav3, list3) => {
                          return (
                            list3 < 15 && (
                              <li key={list3}>
                                <Link href={process.env.NEXT_PUBLIC_BASE_PATH + nav3.slug}>
                                  <a onClick={closeMenuBar}>
                                    <span
                                      className={
                                        nav3.is_new
                                          ? "new"
                                          : nav3.is_popular
                                          ? "popular"
                                          : nav3.is_comingsoon
                                          ? "coming-soon"
                                          : ""
                                      }
                                    >
                                      {nav3.name}
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            )
                          );
                        })}
                        {nav2.children && nav2.children.length > 6 && 14 && (
                          <Link href={process.env.NEXT_PUBLIC_BASE_PATH + "library"}>
                            <a onClick={() => { closeMenuBar(); handleMoreCourseClick(nav2.category_id); }} className="more-course">
                              More courses
                            </a>
                          </Link>
                        )}
                      </ul>
                    )}
                  </li>
                )
              );
            })}
          </ul>
        </div>
        )}
      </li>
    );
  });
};

export default Menu;
