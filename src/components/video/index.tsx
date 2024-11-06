import React from "react";
import ReactPlayer from "react-player";
import "./video.scss";

const Video = () => {
  const trailerUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="video">
      <ReactPlayer
        className="video__player"
        muted={true}
        url={trailerUrl}
        width="100%"
        height="100%"
        data-testid="video-player"
        controls={true}
      />
    </div>
  );
};

export default Video;
