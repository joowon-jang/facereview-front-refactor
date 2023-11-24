import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./mypage.scss";

import Button from "components/Button/Button";
import Chip from "components/Chip/Chip";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import Devider from "components/Devider/Devider";
import SomeIcon from "components/SomeIcon/SomeIcon";

import Etc from "assets/img/etc.png";
import HeaderToken from "api/HeaderToken";
import { useAuthStorage } from "store/authStore";

const MyPage = () => {
  const isMobile = window.innerWidth < 1200;

  const navigate = useNavigate();
  const { setTempToken } = useAuthStorage();
  const watchedVideoIds: Array<{ srcProp: string; emotionProp: string }> = [
    { srcProp: "cVz_ArGCo-A", emotionProp: "happy" },
    { srcProp: "my7FSr-0EPM", emotionProp: "surprise" },
    { srcProp: "paKZL7IWcHM", emotionProp: "sad" },
    { srcProp: "dTBsPShaBro", emotionProp: "sad" },
    { srcProp: "MQteS5ZUEwg", emotionProp: "sad" },
    { srcProp: "4Ddy_GClC68", emotionProp: "happy" },
  ];

  const [selectedEmotion, setSelectedEmotion] = useState("all");

  const filteredVideos = watchedVideoIds.filter(
    (v) => selectedEmotion === "all" || v.emotionProp === selectedEmotion
  );

  const handleChipClick = (emotion: React.SetStateAction<string>) => {
    setSelectedEmotion(emotion);
  };

  const handleLogoutClick = () => {
    HeaderToken.set("");
    setTempToken({ access_token: "" });
    navigate("/main");
  };

  return (
    <>
      <div className="mypage-container">
        <div className="mypage-user-container">
          <div className="mypage-user-info-container">
            <ProfileIcon
              type={isMobile ? "icon-medium" : "icon-large"}
              color={"neutral"}
            />
            <div className="mypage-user-edit-container">
              <div className="mypage-name-container">
                <div className="mypage-name-wrapper">
                  <h2
                    className={
                      isMobile ? "font-title-medium" : "font-title-large"
                    }
                  >
                    하하호호님
                  </h2>
                  <SomeIcon
                    type={isMobile ? "small-next" : "large-next"}
                    onClick={() => navigate("/edit")}
                  />
                </div>
                <h3
                  className={isMobile ? "font-title-mini" : "font-title-medium"}
                >
                  오늘은 어떤 기분이신가요?
                </h3>
              </div>
              <Button
                label="로그아웃"
                type="small-outline"
                onClick={() => navigate("/main")}
                style={
                  isMobile ? { display: "none" } : { marginBottom: "40px" }
                }
              />
            </div>
            <Button
              label="로그아웃"
              type="small-outline"
              onClick={handleLogoutClick}
            />
          </div>
          <Devider />
        </div>

        <div className="mypage-watched-contents-container">
          <div className="mypage-watched-title-container">
            <h3
              className={
                isMobile
                  ? "mypage-title font-title-small"
                  : "mypage-title font-title-medium"
              }
            >
              최근 본 영상
            </h3>
            <div className="mypage-chip-wrapper">
              <Chip
                type={isMobile ? "category-small" : "category-big"}
                choose={"all"}
                onClick={() => handleChipClick("all")}
                isSelected={selectedEmotion === "all"}
                style={
                  isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
                }
              />
              <Chip
                type={isMobile ? "category-small" : "category-big"}
                choose={"happy"}
                onClick={() => handleChipClick("happy")}
                isSelected={selectedEmotion === "happy"}
                style={
                  isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
                }
              />
              <Chip
                type={isMobile ? "category-small" : "category-big"}
                choose={"surprise"}
                onClick={() => handleChipClick("surprise")}
                isSelected={selectedEmotion === "surprise"}
                style={
                  isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
                }
              />
              <Chip
                type={isMobile ? "category-small" : "category-big"}
                choose={"sad"}
                onClick={() => handleChipClick("sad")}
                isSelected={selectedEmotion === "sad"}
                style={
                  isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
                }
              />
              <Chip
                type={isMobile ? "category-small" : "category-big"}
                choose={"angry"}
                onClick={() => handleChipClick("angry")}
                isSelected={selectedEmotion === "angry"}
                style={
                  isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
                }
              />
            </div>
          </div>
          <div className="mypage-video-container">
            <div className="mypage-video-wrapper">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((v) => (
                  <></>
                  // <VideoItem
                  //   key={`watchedVideo${v.srcProp}`}
                  //   width={isMobile ? window.innerWidth - 32 : 360}
                  //   src={`https://www.youtube.com/embed/${v.srcProp}`}
                  //   style={
                  //     isMobile
                  //       ? { paddingTop: "14px", paddingBottom: "14px" }
                  //       : { marginRight: "60px" }
                  //   }
                  //   videoId={v.srcProp}
                  // />
                ))
              ) : (
                // filteredVideos.map((v) => (
                //   <VideoItem
                //     key={`recommendVideo${v.srcProp}`}
                //     width={360}
                //     src={`https://www.youtube.com/embed/${v.srcProp}`}
                //     style={{ marginRight: "60px" }}
                //     videoId={v.srcProp}
                //   />
                // ))
                <div className="mypage-video-empty">
                  <img className="mypage-video-empty-img" src={Etc} alt="etc" />
                  <p className="font-label-large">아직 본 영상이 없어요</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mypage-emotion-container">
          <h2 className="font-title-medium">최근 나의 감정 그래프</h2>
          <div className="mypage-emotion-graph-container"></div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
