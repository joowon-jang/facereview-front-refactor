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
        <div className="user-info-container">
          <img className="user-icon" src="" /> {/* 아이콘자리 */}
          <div className="name-wrapper">
            <h2 className="title font-title-large">하하호호님</h2>
            <Button
              label="로그아웃"
              type="small-outline"
              onClick={() => navigate("/main")}
            />
          </div>
          <h3 className="title font-title-medium">오늘은 어떤 기분이신가요?</h3>
        </div>
        <div className="watched-contents-container">
          <h3 className="watced-contents-title font-title-medium">
            최근 본 영상
          </h3>
          <div className="button-wrapper">
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
          <div className="video-wrapper">
            {watchedVideoIds.map((v) => (
              <VideoItem
                key={`recommendVideo${v}`}
                src={`https://www.youtube.com/embed/${v}`}
                videoId={v}
              />
            ))}
          </div>
        </div>
        <div className="recently-emotion-container">
          <h2 className="title font-title-medium">최근 나의 감정 그래프</h2>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
