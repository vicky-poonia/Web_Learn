import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";
import CloseIcon from '@material-ui/icons/Close';
import Cookies from "js-cookie";
const MenuMobile = ({
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
  const [options, setOptions] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    const finalListMap = menusList.map((a) => {
      let icon = JSON.parse(JSON.stringify(a.icon));
      a.icon_name = icon ? icon.icon : null;
      a.class_name = "detail";
      a.children?.map((b) => {
        if (b.children?.length > 0) {
          a.class_name = "subtitle";
        } else {
          a.class_name = "detail";
        }
      });
      return a;
    });
    setFinalList(finalListMap);
  }, []);
  const handleMoreCourseClick = (slug) => {
    Cookies.set("moreCourseSlug", slug);
  };
  useEffect(() => {
    var menuData: any[] = [];
    finalList.map((nav1, list1) => {
      var navData = {};
      navData['content'] = [];
      let navDatacontent = {};
      navData['hideBorder'] = true;
      // navDatacontent['id'] = list1 + 1;
      if(nav1.children?.length == 0){
        navDatacontent['id'] = list1;
        navDatacontent['name'] = (<><a href={process.env.NEXT_PUBLIC_BASE_PATH + nav1.slug}>{nav1.name}</a></>);
      } else{
        navDatacontent['id'] = list1 + 1;
        navDatacontent['name'] = (<><a >{nav1.name}</a></>);
      }
      navDatacontent['icon'] = <i className={nav1.icon_name}></i>;
      if (nav1.name !== "Hands-on-Labs"){
        navDatacontent['children'] = [];
      }
      let children11: any[] = [];
      children11['content'] = [];
      nav1.children?.map((nav2, list2) => {
        if(list2<6){
        let children1: any[] = [];
        children1['id'] = `${list1 + 1}` + `${list2 + 1}`;
        children1['name'] = (<><a>{nav2.name}</a></>);
        children1['icon'] = <i className={nav2.icon_name}></i>;
        if(nav2.children.length != 0)
        { 
          children1['name'] = (<><a>{nav2.name}</a></>);
          children1['children'] = [];
        }
        else{
          children1['name'] = (<><a href={`/${nav2.slug}`}>{nav2.name}</a></>);
        }
        let children22: any[] = [];
        children22['content'] = [];
        nav2.children?.map((nav3, list3) => {
          if(list3<6){
          let children2: any[] = [];
          children2['id'] = `${list1 + 1}` + `${list2 + 1}` + `${list3 + 1}`;
          children2['name'] = (<><a href={`/${nav3.slug}`} style={{fontWeight:"400",lineHeight:"1.7",padding:"0px"}}>{nav3.name}</a></>);
          children2['to'] = nav3.slug;
          children22['content'].push(children2);
          }
        })
        if(nav2.children && nav2.children?.length >6){
          let children2: any[] = [];
          children2['id'] = `${list1 + 1}` + `${list2 + 1}` + `7`;
          children2['name'] =<h3>more courses</h3>;
          children2['name'] = (
          <>
            <a href={process.env.NEXT_PUBLIC_BASE_PATH + "library"} 
            onClick={() => { handleMoreCourseClick(nav2.category_id); }} ><h3>more courses</h3></a>
          </>);
          // children2['to'] = nav2.slug;
          children22['content'].push(children2);
        }
        if(nav2.children.length != 0)
        {
          children1['children'].push(children22);
        }
       
        children11['content'].push(children1);
      }
      })
      if(nav1.children?.length >6){
        let children1: any[] = [];
        children1['id'] = `${list1 + 1}` + `7`;
        children1['name'] = (<><a href={process.env.NEXT_PUBLIC_BASE_PATH + nav1.slug}><h3>more courses</h3></a></>);
        children1['icon'] = <i className=''></i>;
        children11['content'].push(children1);
      } 
      else if(nav1.children?.length == 0){
        let children1: any[] = [];
        children1['id'] = `${list1}`;
        children1['name'] = (<><a href={process.env.NEXT_PUBLIC_BASE_PATH + nav1.slug}>{nav1.name}</a></>);
        children1['icon'] = <i className=''></i>;
        children11['content'].push(children1);
      }
      if (nav1.name !== "Hands-on-Labs"){
        navDatacontent['children'].push(children11);
      }
      navData['content'].push(navDatacontent)
      menuData.push(navData)
    })
    setOptions(menuData);
  }, [finalList])

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    document.body.classList.remove('o-hidden');
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (itemOptions) => { };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 290 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      className="mobile-sidebar"
    >
      <div  className={`mobile-nav`} id="mobilenav">
        <div className="title">
          <div className="head">
                <>
                  <Link href="/">
                    <a className="logo">
                      <img
                        width={100}
                        height={8}
                        className="img-full"
                        src="/images/logo.svg"
                        alt="Whizlabs Logo"
                      />
                    </a>
                  </Link>
                </>
          </div>
          <div className="close" onClick={(e)=>{
            e.preventDefault()
            document.getElementById('mobilenav').classList.add('mobile-nav-close')
            document.getElementById('transperent-head').classList.add('transparent-head-close')
            setTimeout(()=>{
              setMenuOpen(false)
            },300)
            document.body.classList.remove('o-hidden');
          }}><CloseIcon/></div>
        </div>
        <div className="nav-btn-group">
          {!userData && !userData?.data ? (
            <>
              <button className="btn-i btn-sign-in" onClick={handleSignIn}>Sign in</button>
              <button className="btn-i btn-sign-up" onClick={handleSignUp}> Sign Up</button>
            </>
          ) :
            <button className="btn-i btn-sign-up" onClick={() => handleLogout()}> Logout</button>
          }
        </div>
        <MultilevelSidebar
          open={true}
          options={options}
          header="Navigation"
        // onItemClick={handleClick()}
        />
      </div>
    </Box>
  );
  return (
    <> {options && ["left"].map((anchor) => (
      <React.Fragment key={anchor}>
        {list(anchor)}
      </React.Fragment>
    ))}</>
  )
};


export default MenuMobile;