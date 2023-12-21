import { useEffect, useState } from "react";
// import Grid  from "@mui/material/Grid";
// import Tooltip from "@mui/material/Tooltip";
// import Zoom from "@mui/material/Zoom";
// import Typography  from '@mui/material/Typography';
// import { makeStyles } from "@material-ui/core";
let url = process.env.NEXT_PUBLIC_BASE_PATH;

export const ScrollToTop = () => {
    const scrollToTop = ()=>{
        window.scroll({top: 0, left: 0, behavior: 'smooth' })    }
    return (
        <>
        <button onClick={scrollToTop} className="" id="scrollBtn" title="Go to Top">&#8593;</button>
        </>
    )
}

// export const IconWA = () =>{
//     const useStyles = makeStyles(()=>({
//         customTooltip: {
//             backgroundColor: "rgb(37, 211, 102);",
//             borderRadius: "18px",
//             // height: "30px"
//           }
//     }));
//     const classes = useStyles()
//     return (
//         <>
//         <div className="watsapp">
//                 <Grid item>
//                     <Tooltip
                    
//                     classes={{
//                         tooltip:classes.customTooltip
//                     }}
//                     TransitionComponent={Zoom}
//                     placement="right"
//                     title={<Typography fontSize={15}fontWeight={550}fontFamily={"Poppins, sans-serif"}color={"rgb(255, 255, 255)"}marginLeft={"2px"}>WhatsApp us</Typography>}
                    
//                     >
//                     <p onClick={() => {
//                         window.open("https://wa.me/916364678444", "_blank")
//                       }} >
//                       <img src={`${url}images/whatsapp-us.svg`} alt="new" style={{width:"48px", height:"48px", margin: "0px"}} />
//                     </p>
//                     </Tooltip>
//                 </Grid>
            
//         </div>
//         </>
//     )
// }
