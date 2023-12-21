import { connect } from "react-redux";
import { useRouter } from "next/router"
import { useEffect } from "react"

const CommonTimer = ({offerHeader,setOfferHeaderTimer,showTimer,checkout_combo})=>{
    const router = useRouter()
    useEffect(()=>{
        let timeoutIntraval = setInterval(()=>{

            //TODO:campaign_offer_timer

            
            //offer header timer
            if(offerHeader && offerHeader.status == true){
                let date_now_utc = new Date().getTime()
                let end_date_utc = new Date(new Date(offerHeader.end_date).toISOString()).getTime()
                let start_date_utc = new Date(new Date(offerHeader.start_date).toISOString()).getTime();
                if( start_date_utc > date_now_utc || end_date_utc < date_now_utc ){
                    //clear timer
                   setOfferHeaderTimer(false)
                   if(checkout_combo != null && router.pathname.includes("combo") && checkout_combo == offerHeader.slug){
                    router.push('/')
                   }
                }else{
                    let diff = end_date_utc - date_now_utc;
                    if (diff > 0) {
                    setOfferHeaderTimer(true)
                      let diff_sec = diff / 1000;
              
                      // let days = Math.floor(diff_sec / 86400);
                      let hours = Math.floor((diff_sec) / 3600);
                      let min = Math.floor((diff_sec - hours * 3600) / 60);
                      let sec = Math.floor(diff_sec - hours * 3600 - min * 60);
              
                      let h = hours > 9 ? `${hours}h` : `0${hours}h`;
                      let m = min > 9 ? `${min}m` : `0${min}m`;
                      let s = sec > 9 ? `${sec}s` : `0${sec}s`;
              
                      if (document) {
                        if (
                          document.getElementById("mytimer-hours-offer") &&
                          document.getElementById("mytimer-min-offer") &&
                          document.getElementById("mytimer-sec-offer")
                        ) {
                          document.getElementById("mytimer-hours-offer").innerHTML = h;
                          document.getElementById("mytimer-min-offer").innerHTML = m;
                          document.getElementById("mytimer-sec-offer").innerHTML = s;
                        }
                        if (
                            document.getElementById("mytimer-hours-checkout") &&
                            document.getElementById("mytimer-min-checkout") &&
                            document.getElementById("mytimer-sec-checkout")
                          ) {
                            document.getElementById("mytimer-hours-checkout").innerHTML = h;
                            document.getElementById("mytimer-min-checkout").innerHTML = m;
                            document.getElementById("mytimer-sec-checkout").innerHTML = s;
                          }
                      }
                    }else{
                        setOfferHeaderTimer(false)
                        if(checkout_combo != null && router.pathname.includes("combo") && checkout_combo == offerHeader.slug){
                            router.push('/')
                           }
                    }
                }
            }else{
                setOfferHeaderTimer(false)
                if(checkout_combo != null && router.pathname.includes("combo") && checkout_combo == offerHeader.slug){
                    router.push('/')
                   }
            }

        },1000)

        return (()=>{
            clearInterval(timeoutIntraval)
        })
    },[])
    return <></>
}

const mapStateToProps = (state)=>{
  return {
    checkout_combo:state.combo_slug.combo_slug
  }
}
const mapDispatchToProps = (dispatch)=>{
    return {
      
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(CommonTimer)