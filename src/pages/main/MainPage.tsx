import VideoItem from "components/VideoItem/VideoItem";
import { ReactElement } from "react";
import "./mainpage.scss";

const MainPage = (): ReactElement => {
  const dummyVideoIds = [
    "FtK_N-r05q4",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
  ];

  return (
    <div className="page-container">
      <div className="personal-recommend-contents-container">
        <h2 className="title font-title-large">
          하하호호님이 좋아할 오늘의 영상들을 골라봤어요.
        </h2>
        <h4 className="subtitle font-title-small">
          시청 기록과 감정을 분석해서 가장 좋아할 영상을 준비했어요.
        </h4>
        <div className="video-container">
          <div className="button-wrapper"></div>
          <div className="video-wrapper">
            {dummyVideoIds.map((v) => (
              <VideoItem
                key={`videoItem${v}`}
                src={`https://www.youtube.com/embed/${v}`}
                videoId={v}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hot-contents-container">
        <h2 className="title font-title-large">
          하하호호님이 위해 준비한 인기있는 영상이에요.
        </h2>
        <div className="video-container">
          <div className="button-wrapper"></div>
          <div className="video-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
