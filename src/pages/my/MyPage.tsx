import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./mypage.scss";

import VideoItem from "components/VideoItem/VideoItem";
import Button from "components/Button/Button";
import Chip from "components/Chip/Chip";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import Devider from "components/Devider/Devider";
import NextIcon from "components/NextIcon/NextIcon";

import Etc from "assets/img/etc.png";

const MyPage = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="mypage-container">
        <div className="mypage-user-container">
          <ProfileIcon type={"icon-large"} color={"neutral"} />
          <div className="mypage-name-container">
            <div className="mypage-name-wrapper">
              <div className="mypage-name">
                <h2 className="mypage-title font-title-large">하하호호님</h2>
              </div>
              <NextIcon
                type="large"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/edit")}
              />
            </div>
            <Button
              label="로그아웃"
              type="small-outline"
              onClick={() => navigate("/main")}
            />
          </div>
          <h3 className="mypage-title font-title-medium">
            오늘은 어떤 기분이신가요?
          </h3>
          <Devider style={{ marginTop: "56px" }} />
        </div>
        <div className="mypage-watched-contents-container">
          <h3 className="mypage-title font-title-medium">최근 본 영상</h3>
          <div className="mypage-chip-wrapper">
            <Chip
              type={"category-big"}
              emotion={"all"}
              onClick={() => handleChipClick("all")}
              isSelected={selectedEmotion === "all"}
              style={{ marginRight: "24px" }}
            />
            <Chip
              type={"category-big"}
              emotion={"happy"}
              onClick={() => handleChipClick("happy")}
              isSelected={selectedEmotion === "happy"}
              style={{ marginRight: "24px" }}
            />
            <Chip
              type={"category-big"}
              emotion={"surprise"}
              onClick={() => handleChipClick("surprise")}
              isSelected={selectedEmotion === "surprise"}
              style={{ marginRight: "24px" }}
            />
            <Chip
              type={"category-big"}
              emotion={"sad"}
              onClick={() => handleChipClick("sad")}
              isSelected={selectedEmotion === "sad"}
              style={{ marginRight: "24px" }}
            />
            <Chip
              type={"category-big"}
              emotion={"angry"}
              onClick={() => handleChipClick("angry")}
              isSelected={selectedEmotion === "angry"}
            />
          </div>
          <div className="mypage-video-container">
            <div className="mypage-video-wrapper">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((v) => (
                  <VideoItem
                    key={`recommendVideo${v.srcProp}`}
                    width={360}
                    src={`https://www.youtube.com/embed/${v.srcProp}`}
                    style={{ marginRight: "60px" }}
                    videoId={v.srcProp}
                  />
                ))
              ) : (
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
