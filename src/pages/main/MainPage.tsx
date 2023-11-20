import api from "api";
import { checkTutorial } from "api/auth";
import { getTestVideo } from "api/youtube";
import StepIndicator from "components/StepIndicator/StepIndicator";
import VideoItem from "components/VideoItem/VideoItem";
import { ReactElement, useEffect, useState } from "react";
import { useAuthStorage } from "store/authStore";
import "./mainpage.scss";

const MainPage = (): ReactElement => {
  const { id, nickname, access_token, refresh_token } = useAuthStorage();
  const recommendVideoIds = [
    "cVz_ArGCo-A",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
  ];
  const dummyVideoIds = [
    "cVz_ArGCo-A",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
    "MO2HeLHebMo",
    "dTBsPShaBro",
    "SeeiDfqtcTU",
    "auR98D6X_eo",
    "VgrXUxsIVtg",
    "eMpzQVVY6zo",
    "rOozR1lRwKM",
    "ojUMHhHpmDc",
    "pasRphQvEUE",
    "B549suUxjQw",
    "EjCs5ej41XI",
    "W7cR4kcQq_E",
  ];
  const [personalVideoIndicator, setPersonalVideoIndicator] =
    useState<number>(1);

  useEffect(() => {
    if (access_token) {
      console.log("already sign in", access_token);
      checkTutorial({ cur_access_token: access_token })
        .then((res) => {
          console.log("check tutorial----------------");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="main-page-container">
      <div className="personal-recommend-contents-container">
        <h2 className="title font-title-large">
          하하호호님이 좋아할 오늘의 영상들을 골라봤어요.
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
            {recommendVideoIds.map((v) => (
              <VideoItem key={`recommendVideo${v}`} videoId={v} />
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
          <div className="video-wrapper">
            {dummyVideoIds.map((v) => (
              <VideoItem
                key={`videoItem${v}`}
                videoId={v}
                style={{ marginBottom: "56px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
