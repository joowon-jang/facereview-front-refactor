import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import YouTube, { YouTubeEvent } from "react-youtube";
import { Options, YouTubePlayer } from "youtube-player/dist/types";
import "./videoitem.scss";

type VideoItemPropsType = {
  src?: string;
  videoId: string;
  width?: number;
  style?: React.CSSProperties;
};

const VideoItem = ({
  src,
  videoId,
  width,
  style,
}: VideoItemPropsType): ReactElement => {
  const navigation = useNavigate();
  const height = width ? width * (9 / 16) : null;
  const opts: Options = {
    width: width ? width : 280,
    height: height ? height : 158,
    playerVars: {
      autoplay: 1,
      color: "white",
      controls: 0,
      disablekb: 0,
      fs: 0,
      rel: 0,
    },
  };

  const [video, setVideo] = useState<YouTubePlayer | null>(null);

  const handleClick = () => {
    navigation(`/watch/${videoId}`);
  };

  const handleVideoReady = (e: YouTubeEvent<any>) => {
    e.target.mute();
    setVideo(e.target);
  };

  const handleMouseHover = () => {
    if (video?.isMuted() && video?.playVideo) {
      video?.unMute();
      video?.playVideo();
    }
  };
  const handleMouseOut = () => {
    if (video?.isMuted && !video?.isMuted() && video?.stopVideo) {
      video?.mute();
      video?.stopVideo();
    }
  };

  return (
    <div
      className="video-item-container"
      style={{ ...style, width: `${width ? width : 280}px` }}
      onClick={handleClick}
      onMouseOver={handleMouseHover}
      onMouseOut={handleMouseOut}
    >
      <div
        className="thumbnail-wrapper"
        style={{ width: width ? width : 280, height: height ? height : 158 }}
      >
        <img
          className="video-thumbnail"
          style={{ width: width ? width : 280, height: height ? height : 158 }}
          src={`http://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt=""
        />
        <YouTube
          videoId={videoId}
          // id={string} // defaults -> ''
          // className={string} // defaults -> ''
          iframeClassName={"youtube-item"} // defaults -> ''
          // style={object} // defaults -> {}
          // title={string} // defaults -> ''
          // loading={string} // defaults -> undefined
          opts={opts} // defaults -> {}
          onReady={handleVideoReady} // defaults -> noop
          // onPlay={func} // defaults -> noop
          // onPause={func} // defaults -> noop
          // onEnd={func} // defaults -> noop
          // onError={func} // defaults -> noop
          // onStateChange={handleStateChange} // defaults -> noop
          // onPlaybackRateChange={func} // defaults -> noop
          // onPlaybackQualityChange={func} // defaults -> noop
        />
      </div>
      <div className="video-info-container">
        <h3 className="video-title font-label-large">
          [#알쓸범잡] (3시간) 김상욱 교수가 알려주는 DNA의 비밀🧬 피 한 방울
          만으로 범인을 검거한 과학수사의 모든 것👮
        </h3>
        <h3 className="video-emotion-data font-body-medium">😄 38.9%</h3>
      </div>
    </div>
  );
};

export default VideoItem;
