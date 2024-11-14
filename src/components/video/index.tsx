import React from "react";
import ReactPlayer from "react-player";
import "./video.scss";

interface Props {
  url: string;
  responsive?: boolean;
  playing?: boolean;
}

const Video: React.FC<Props> = ({ responsive = true, url, playing }) => {
  const trailerUrl = `https://www.youtube.com/watch?v=${url}`;
  const baseClass = "video";
  const responsiveClass = responsive ? "video--responsive" : "";
  const classes = [baseClass, responsiveClass].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <ReactPlayer
        className="video__player"
        data-testid="video-player"
        muted={true}
        url={trailerUrl}
        width={responsive ? "100%" : "auto"}
        height="100%"
        controls={true}
        playing={playing}
      />
    </div>
  );
};

export default Video;
