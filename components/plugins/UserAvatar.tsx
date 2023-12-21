import { materialColor } from "helpers/CustomHelpers";

const bgc = materialColor();
const UserAvatar = ({ img = null, alt, email=null, username, width = 60, height = 60, background = bgc , fsize = null }) => {
  let profileImg = null;

  if (img) {
    if (img.includes("googleuser") || img.includes("fbsbx") || img.includes("licdn")) {
      profileImg = img;
    } else {
      profileImg = `${process.env.NEXT_PUBLIC_LEARN_MEDIA_URL}${img}`;
    }
  }

  return (
    <div className="student-img">
      {/* {img && !(img.includes("google") || img.includes("fbsbx") || img.includes("licdn"))  ? ( */}
      {profileImg ? (
        <img
          src={profileImg}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/no-image.png";
          }}
          alt={alt}
          className="img-full"
          style={{ borderRadius: "100%" }}
        />
      ) : (
        <div
          className="custom_avatar"
          style={{
            background: `${background}`,
            width: `${width}px`,
            height: `${height}px`,
            fontSize:`${fsize}rem`
          }}
        >
          {username ? username?.trim().slice(0, 1).toUpperCase() : email?.trim().slice(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
