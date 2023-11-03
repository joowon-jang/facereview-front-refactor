import { ReactElement } from "react";
import YouTube from "react-youtube";
import "./videoitem.scss";

type VideoItemPropsType = {
  src: string;
  videoId: string;
  style?: React.CSSProperties;
};

const VideoItem = ({
  src,
  videoId,
  style,
}: VideoItemPropsType): ReactElement => {
  const opts = {
    width: 280,
    height: 158,
    modestbranding: 0,
    color: "white",
    controls: false,
    disablekb: 0,
  };

  return (
    <div className="video-item-container" style={style}>
      <img
        className="video-thumbnail"
        src={`http://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt=""
      />
      <YouTube
        videoId={videoId}
        // id={string} // defaults -> ''
        // className={string} // defaults -> ''
        // iframeClassName={string} // defaults -> ''
        // style={object} // defaults -> {}
        // title={string} // defaults -> ''
        // loading={string} // defaults -> undefined
        opts={opts} // defaults -> {}
        // onReady={func} // defaults -> noop
        // onPlay={func} // defaults -> noop
        // onPause={func} // defaults -> noop
        // onEnd={func} // defaults -> noop
        // onError={func} // defaults -> noop
        // onStateChange={func} // defaults -> noop
        // onPlaybackRateChange={func} // defaults -> noop
        // onPlaybackQualityChange={func} // defaults -> noop
      />
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
