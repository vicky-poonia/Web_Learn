import { useEffect, useState } from "react";

export const LikeDislike = ({likeCount , dislikeCount}) => {
    const [like, setLike] = useState(likeCount);
    const [dislike, setDislike] = useState(dislikeCount);
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    useEffect(() => {
        setLike(like);
    }, [like]);

    useEffect(() => {
        setDislike(dislike);
    }, [dislike]);

    const setL = () => {
        setLikeActive(!likeActive);
        setLike(likeActive? like - 1 : like + 1);
      }
    
      const setD = () => {
        setDislikeActive(!dislikeActive);
        
        setDislike(dislikeActive? dislike - 1 : dislike + 1);
      }
      const handleLike = (e) => {
        e.preventDefault();
        if (dislikeActive) {
          setL();
          setD();
        }
        else {
          setL();
        }
      };
      const handleDislike = (e) => {
        e.preventDefault();
        if (likeActive) {
          setD();
          setL();
        }
        else {
          setD();
        }
      };

    return (
        <div className="useful">
        Was this review helpful?&nbsp;&nbsp;
        <i 
        className={`icon-thumb icon icon-font-thumb-filled ${likeActive ? 'active' : ''}`} 
        onClick={(e)=> handleLike(e)}></i>
        <span>{like}</span>&nbsp;&nbsp;
        <i className={`icon-thumb-down icon icon-font-thumb-filled ${dislikeActive ? 'active' : ''}`} 
        onClick={(e)=> handleDislike(e)}></i>
        <span>{dislike}</span>
      </div>
    )



}


