import { ReactElement, useEffect, useState } from "react";
import { useAuthStorage } from "store/authStore";
import StepIndicator from "components/StepIndicator/StepIndicator";
import VideoItem from "components/VideoItem/VideoItem";
import "./mainpage.scss";
import { getAllVideo, getPersonalRecommendedVideo } from "api/youtube";
import { VideoDataType } from "types";

const MainPage = (): ReactElement => {
  const { is_sign_in, user_name } = useAuthStorage();
  const [personalVideoIndicator, setPersonalVideoIndicator] =
    useState<number>(1);
  const [allVideo, setAllVideo] = useState<VideoDataType[]>([]);

  useEffect(() => {
    getAllVideo()
      .then((data) => {
        console.log(data);
        setAllVideo(data);
      })
      .catch((err) => console.log(err));

    if (is_sign_in) {
      getPersonalRecommendedVideo()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="main-page-container">
      {is_sign_in ? (
        <div className="personal-recommend-contents-container">
          <h2 className="title font-title-large">
            {user_name}님이 좋아할 오늘의 영상들을 골라봤어요.
          </h2>
          <h4 className="subtitle font-title-small">
            시청 기록과 감정을 분석해서 가장 좋아할 영상을 준비했어요.
          </h4>
          <div className="video-container">
            <div className="indicator-wrapper">
              <StepIndicator
                step={personalVideoIndicator}
                maxStep={2}
                indicatorWidth={37}
              />
            </div>
            <div className="video-wrapper">
              {/* {recommendVideoIds.map((v) => (
                <VideoItem key={`recommendVideo${v}`} videoId={v} />
              ))} */}
            </div>
          </div>
        </div>
      ) : null}

      <div className="hot-contents-container">
        <h2 className="title font-title-large">
          {is_sign_in
            ? `${user_name}님을 위해 준비한 인기있는 영상이에요.`
            : "감정별로 볼 수 있는 영상을 추천해드릴게요."}
        </h2>
        <div className="video-container">
          <div className="button-wrapper"></div>
          <div className="video-wrapper">
            {allVideo.map((v) => (
              <VideoItem
                key={`videoItem${v.youtube_url}${v.youtube_most_emotion_per}`}
                videoId={v.youtube_url}
                style={{ marginBottom: "56px" }}
                videoTitle={v.youtube_title}
                videoMostEmotion={v.youtube_most_emotion}
                videoMostEmotionPercentage={v.youtube_most_emotion_per}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
