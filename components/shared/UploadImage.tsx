import { useState } from "react";
import {
  Slider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";

const UploadImage = ({ uploadProcess, onImageChange, openStatus, setUploadModal }) => {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState(null);
  const [slider, setSlider] = useState(1.2);
  const [msg, setMsg] = useState('');

  const closeModal = (e) => {
    e.preventDefault();
    setUploadModal(false);
    setImage("");
    setCrop({});
  };

  const changeSlider = (event, value) => {
    event.preventDefault();
    if (value > 1.2) {
      setSlider(value);
    } else {
      setSlider(1.2);
    }
  };

  const onUploadImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (file && allowedTypes.includes(file.type)) {
      setImage(URL.createObjectURL(file));
    } else {
      setMsg("Invalid file type");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  const cropImage = async (e) => {
    if (crop) {
      onImageChange(crop.getImage().toDataURL());
    }
  };

  const setEditorRef = (editor) => {
    setCrop(editor);
  };

  return (
    <>
      <Dialog aria-labelledby="customized-dialog-title" open={openStatus}>
        <DialogTitle id="customized-dialog-title">Upload Image</DialogTitle>
        <DialogContent dividers>
          {image ? (
            <div>
              <AvatarEditor
                ref={setEditorRef}
                image={image}
                width={250}
                height={250}
                border={60}
                borderRadius={120}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={slider}
                rotate={0}
              />
              <Slider
                defaultValue={2}
                step={0.4}
                value={slider}
                onChange={changeSlider}
                min={1.2}
                max={20}
                aria-labelledby="continuous-slider"
              />
            </div>
          ) : (
            <>
            <div style={{color: "red"}}>{msg}</div>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={(e) => onUploadImage(e)} />
            </Button>
            </>
          )}
          {uploadProcess ? <LinearProgress /> : ""}
        </DialogContent>
        {!uploadProcess ? (
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={(e) => closeModal(e)}>
              Cancel
            </Button>
            {image ? (
              <Button variant="contained" color="primary" onClick={(e) => cropImage(e)}>
                Save
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default UploadImage;
