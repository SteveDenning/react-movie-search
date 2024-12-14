import React from "react";
import ReactPlayer from "react-player";
import "./video.scss";

interface Props {
  youTubeKey: string;
  responsive?: boolean;
  playing?: boolean;
}

const Video: React.FC<Props> = ({ responsive, youTubeKey, playing }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${youTubeKey}`;

  // Class Definitions
  const baseClass = "video";
  const responsiveClass = responsive ? "video--responsive" : "";
  const classes = [baseClass, responsiveClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="video"
    >
      <ReactPlayer
        className="video__player"
        data-testid="video-player"
        muted={true}
        url={videoUrl}
        width={responsive ? "100%" : "auto"}
        height="100%"
        controls={true}
        playing={playing}
      />
    </div>
  );
};

export default Video;
