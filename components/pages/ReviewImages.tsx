const baseUrl = process.env.NEXT_PUBLIC_WEB_MEDIA_URL;

const ImageReviews = ({width})=>{
    return <>
        <div className="person-1 pr" style={{background:`url(${baseUrl}person1.png)`}}></div>
        <div className="person-2 pr" style={{background:`url(${baseUrl}person2.png)`}}></div>
        <div className="person-3 pr" style={{background:`url(${baseUrl}person3.png)`}}></div>
        <div className="person-4 pr" style={{background:`url(${baseUrl}person4.png)`}}></div>
        {width > 1200 && <div className="person-5 pr" style={{background:`url(${baseUrl}person5.png)`}}></div>}
        {width > 1330 && <div className="person-6 pr" style={{background:`url(${baseUrl}person6.png)`}}></div>}
        {width >1330 && <div className="person-7 pr" style={{background:`url(${baseUrl}person7.png)`}}></div>}
        {/* <div className="person-8 pr" style={{background:`url(${baseUrl}person8.png)`}}></div> */}
    </>
}

export default ImageReviews;