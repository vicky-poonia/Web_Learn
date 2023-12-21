
import { fontWeight } from "@mui/system";
import { useEffect } from "react";

const MyTimer = ({design}) => {
  return (
    <>
      <div className="timer-container" style={design?{
        width:`${design.totalWidth}px`,
        top:`${design.topAbs}%`,
        left:`${design.leftAbs}%`,
        transform:`translate(-${design.leftAbs}%,-${design.topAbs}%)`,
        color:`${design.fontColor}`
      }:{}}>
        <div className="times" style={design ? {
          width:`${design.boxSize}px`,
          background:`${design.backgroundColor}`,
          borderRadius:`${design.borderRadius}%`,
          padding:`${design.padding}px`

        }:{}}>
          <div className="val" style={design? {
            fontSize:`${design.fontSize}px`,
            fontWeight:`${design.fontWeight}`
          } :{}}
          id="mytimer-days"
          ></div>
          <div className="txt">days</div>
        </div>
        <div className="times" style={design ? {
          width:`${design.boxSize}px`,
          background:`${design.backgroundColor}`,
          borderRadius:`${design.borderRadius}%`,
          padding:`${design.padding}px`

        }:{}}>
          <div className="val" style={design? {
            fontSize:`${design.fontSize}px`,
            fontWeight:`${design.fontWeight}`
          } :{}}
          id="mytimer-hours"
          ></div>
          <div className="txt">hours</div>
        </div>
        <div className="times" style={design ? {
          width:`${design.boxSize}px`,
          background:`${design.backgroundColor}`,
          borderRadius:`${design.borderRadius}%`,
          padding:`${design.padding}px`

        }:{}}>
          <div className="val" style={design? {
            fontSize:`${design.fontSize}px`,
            fontWeight:`${design.fontWeight}`
          } :{}}
          id="mytimer-min"
          > </div>
          <div className="txt">min</div>
        </div>
        <div className="times" style={design ? {
          width:`${design.boxSize}px`,
          background:`${design.backgroundColor}`,
          borderRadius:`${design.borderRadius}%`,
          padding:`${design.padding}px`

        }:{}}>
          <div className="val" style={design? {
            fontSize:`${design.fontSize}px`,
            fontWeight:`${design.fontWeight}`
          } :{}}
          id="mytimer-sec"
          ></div>
          <div className="txt">sec</div>
        </div>
        
      </div>
    </>
  );
};

export default MyTimer;
