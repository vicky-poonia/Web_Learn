import { useState,useEffect } from "react"
import cookie from "js-cookie";

const BlackfirdayLibrary = ()=>{

    const [bannerstatus,setbannerStatus] = useState(true)
    const[width,setwidth] = useState(0)
    useEffect(()=>{
        if(window)
        {
            setwidth(window.innerWidth)
        }
        const handleResize = ()=>{
            setwidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize)
        return (()=>{
            window.removeEventListener("resize",handleResize)
        })
    })
    return <>
        <div className="exclusive-banner pricing-bf" style={bannerstatus ?{display:"block",background:"linear-gradient(90deg, rgba(40,0,33,1) 0%, rgba(85,15,72,1) 100%)"}:{display:"none"}}>
            <div className="container">
                {width > 450 &&  <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}dark-lib.webp`} alt="pricing footer" style={{width:"100%",objectFit:"contain"}}></img>}
                {width <=450 &&  <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}dark-lib-m.png`} alt="pricing footer" style={{width:"100%",objectFit:"contain"}} ></img>}
            </div>
            <i
        className="btn-close icon-font-cross"
        onClick={(e) => {
            e.preventDefault();
            setbannerStatus(false)
            cookie.set("subs_bottom_banner", "active", { expires: 3 });
        }}
      ></i>
        </div>
    </>
}

export default BlackfirdayLibrary;