import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import style from "./SiteUnderMaintenance.module.css";

const SiteUnderMaintenanceBanner = (selected_Maintenance_details) => {
  const [positionB] = useState(
    selected_Maintenance_details?.selected_Maintenance_details.banner_position
  );
  const [bannerActive, setBannerActive] = useState(false);

  useEffect(() => {
      const bottomBannerActive = cookie.get("subs_bottom_banner");
      setBannerActive(bottomBannerActive ? false : true);
  }, []);
  return (
    <div
      className={`${style.annoucementBlock} ${positionB === 0 ? "" : "fixed-block"}`}
      style={{
        position: positionB === 1 ? "fixed" : "relative",
        bottom: bannerActive ? "100px" : "0px",
        top: positionB === 0 ? "0px" : "auto",
      }}
    >
      <div className={`${style.container} ${positionB === 0 ? "" : "fixed-block"}`}>
        {selected_Maintenance_details.selected_Maintenance_details.banner_text && (
          <div
            dangerouslySetInnerHTML={{
              __html: selected_Maintenance_details.selected_Maintenance_details.banner_text,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SiteUnderMaintenanceBanner;
