import React, { useState } from "react";
import VideoItem from "components/VideoItem/VideoItem";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";
import Chip from "components/Chip/Chip";
import "./mypage.scss";

const MyPage = (): ReactElement => {
  const navigate = useNavigate();
  const watchedVideoIds = [
    "cVz_ArGCo-A",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
  ];

  const [selectedEmotion, setSelectedEmotion] = useState("all");

  const handleChipClick = (emotion: React.SetStateAction<string>) => {
    setSelectedEmotion(emotion);
  };

  return (
    <>
      <div className="mypage-container">
        <div className="mypage-user-container">
          <div className="maypage-user-info-container">
            <img className="mypage-user-icon" src="" /> {/* 아이콘자리 */}
            <div className="mypage-name-wrapper">
              <div className="mypage-user-name-container">
                <h2 className="mypage-user-name font-title-large">
                  하하호호님
                </h2>
                {/* 아이콘자리 */}
              </div>
              <Button
                label="로그아웃"
                type="small-outline"
                onClick={() => navigate("/main")}
              />
            </div>
          </div>
          <h3 className="mypage-emotion-state font-title-medium">
            오늘은 어떤 기분이신가요?
          </h3>
        </div>
        {/* devider */}
        <div className="mypage-watched-contents-container">
          <h3 className="mypage-watched-contents-title font-title-medium">
            최근 본 영상
          </h3>
          <div className="mypage-button-wrapper">
            <Chip
              type={"category-big"}
              emotion={"all"}
              onClick={() => handleChipClick("all")}
              isSelected={selectedEmotion === "all"} // isSelected prop을 설정
            />
            <Chip
              type={"category-big"}
              emotion={"happy"}
              onClick={() => handleChipClick("happy")}
              isSelected={selectedEmotion === "happy"}
            />
            <Chip
              type={"category-big"}
              emotion={"surprise"}
              onClick={() => handleChipClick("surprise")}
              isSelected={selectedEmotion === "surprise"}
            />
            <Chip
              type={"category-big"}
              emotion={"sad"}
              onClick={() => handleChipClick("sad")}
              isSelected={selectedEmotion === "sad"}
            />
            <Chip
              type={"category-big"}
              emotion={"angry"}
              onClick={() => handleChipClick("angry")}
              isSelected={selectedEmotion === "angry"}
            />
            <Chip
              type={"category-big"}
              emotion={"neutral"}
              onClick={() => handleChipClick("neutral")}
              isSelected={selectedEmotion === "neutral"}
            />
          </div>
          <div className="mypage-video-wrapper">
            {watchedVideoIds.map((v) => (
              <VideoItem
                key={`recommendVideo${v}`}
                src={`https://www.youtube.com/embed/${v}`}
                videoId={v}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mypage-recently-emotion-container">
        <h2 className="font-title-medium">최근 나의 감정 그래프</h2>
        <div></div>
      </div>
    </>
  );
};

export default MyPage;
