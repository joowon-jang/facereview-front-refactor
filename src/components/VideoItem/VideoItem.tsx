import { ReactElement } from "react";
import YouTube from "react-youtube";
import "./videoitem.scss";

type VideoItemPropsType = {
  src: string;
};

const VideoItem = ({ src }: VideoItemPropsType): ReactElement => {
  const opts = {
    modestbranding: 0,
    color: "white",
    controls: false,
    disablekb: 0,
  };

  return (
    <div className="video-item-container">
      <YouTube
        videoId={"FtK_N-r05q4"}
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
    </div>
  );
};

export default VideoItem;
