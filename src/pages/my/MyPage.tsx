import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./mypage.scss";

import Button from "components/Button/Button";
import Chip from "components/Chip/Chip";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import Devider from "components/Devider/Devider";
import SomeIcon from "components/SomeIcon/SomeIcon";

import { ResponsivePie } from "@nivo/pie";
import Etc from "assets/img/etc.png";
import HeaderToken from "api/HeaderToken";
import { useAuthStorage } from "store/authStore";
import VideoItem from "components/VideoItem/VideoItem";
import {
  getAllEmotionTimeData,
  getDounutGraphData,
  getRecentVideo,
} from "api/youtube";
import { EmotionType, VideoWatchedType } from "types/index";
import { mapNumberToEmotion } from "utils/index";
import useWindowSize from "utils/useWindowSize";

const MyPage = () => {
  const { is_sign_in, user_name, user_profile } = useAuthStorage();

  const isMobile = useWindowSize();

  const navigate = useNavigate();
  const { setTempToken } = useAuthStorage();

  const [selectedEmotion, setSelectedEmotion] = useState("all");
  const [recentVideo, setRecentVideo] = useState<VideoWatchedType[]>([]);
  const [emotionTimeData, setEmotionTimeData] = useState<{
    [key in EmotionType]: number;
  }>({ happy: 0, sad: 0, surprise: 0, angry: 0, neutral: 0 });
  const [donutGraphData, setDonutGraphData] = useState<
    {
      id: string;
      label: string;
      value: number;
      color: string;
    }[]
  >([
    {
      id: "😄",
      label: "즐거운",
      value: 366,
      color: "#FF4D8D",
    },
    {
      id: "😥",
      label: "슬픈",
      value: 280,
      color: "#479CFF",
    },
    {
      id: "😲",
      label: "놀라운",
      value: 379,
      color: "#92C624",
    },
    {
      id: "😠",
      label: "화나는",
      value: 474,
      color: "#FF6B4B",
    },
    {
      id: "😐",
      label: "무표정",
      value: 265,
      color: "#393946",
    },
  ]);

  const filteredRecentVideos = recentVideo.filter(
    (v) => selectedEmotion === "all" || v.most_emotion === selectedEmotion
  );

  const handleChipClick = (emotion: React.SetStateAction<string>) => {
    setSelectedEmotion(emotion);
  };

  const handleLogoutClick = () => {
    HeaderToken.set("");
    setTempToken({ access_token: "" });
    navigate("/main");
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (is_sign_in) {
      getRecentVideo()
        .then((data) => {
          setRecentVideo(data);
        })
        .catch((err) => console.log(err));
      getDounutGraphData()
        .then((res) => {
          const newData = [
            { ...donutGraphData[0], value: res.happy_per_avg },
            { ...donutGraphData[1], value: res.sad_per_avg },
            { ...donutGraphData[2], value: res.surprise_per_avg },
            { ...donutGraphData[3], value: res.angry_per_avg },
            { ...donutGraphData[4], value: res.neutral_per_avg },
          ];
          setDonutGraphData(newData);
          console.log(res);
        })
        .catch((err) => console.log(err));
      getAllEmotionTimeData()
        .then((res) => {
          console.log(res);
          setEmotionTimeData(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <div className="my-page-container">
        <div className="my-page-user-container">
          <div className="my-page-user-info-container">
            <ProfileIcon
              type={isMobile ? "icon-medium" : "icon-large"}
              color={mapNumberToEmotion(user_profile)}
            />
            <div className="my-page-user-edit-container">
              <div className="my-page-name-container">
                <div className="my-page-name-wrapper">
                  <h2
                    className={
                      isMobile
                        ? "my-page-username font-title-medium"
                        : "my-page-username font-title-large"
                    }
                  >
                    {user_name}님
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
                onClick={handleLogoutClick}
                style={
                  isMobile ? { display: "none" } : { marginBottom: "40px" }
                }
              />
            </div>
          </div>
          <Devider />
        </div>

        <div className="my-page-watched-contents-container">
          <div className="my-page-watched-title-container">
            <h3
              className={
                isMobile
                  ? "my-page-title font-title-small"
                  : "my-page-title font-title-medium"
              }
            >
              최근 본 영상
            </h3>
            <div className="my-page-chip-container">
              <div className="my-page-chip-wrapper">
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
          </div>
          <div className="my-page-video-container">
            <div className="my-page-video-wrapper">
              {filteredRecentVideos.length > 0 ? (
                filteredRecentVideos.map((v) => (
                  <VideoItem
                    type="big-emoji"
                    key={`videoItem${v.youtube_url}${v.most_emotion_per}`}
                    width={isMobile ? window.innerWidth - 32 : 360}
                    videoId={v.youtube_url}
                    videoTitle={v.youtube_title}
                    videoMostEmotion={v.most_emotion}
                    videoMostEmotionPercentage={v.most_emotion_per}
                    style={
                      isMobile
                        ? { paddingTop: "14px", paddingBottom: "14px" }
                        : { marginRight: "60px" }
                    }
                  />
                ))
              ) : (
                <div className="my-page-video-empty">
                  <img
                    className="my-page-video-empty-img"
                    src={Etc}
                    alt="etc"
                  />
                  <p
                    className={
                      isMobile ? "font-lebel-medium" : "font-label-large"
                    }
                  >
                    아직 본 영상이 없어요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="my-page-emotion-container">
          <h2 className={isMobile ? "font-title-small" : "font-title-medium"}>
            최근 나의 감정 그래프
          </h2>
          <div className="my-page-emotion-graph-container">
            <div className="pie-graph-container">
              <ResponsivePie
                colors={["#FF4D8D", "#479CFF", "#92C624", "#FF6B4B", "#393946"]}
                data={donutGraphData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={false}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#000",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#000",
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
            <div className="emotion-time-container">
              <h3 className="font-title-large emotion-time-title">
                페이스리뷰에서
              </h3>
              <div className="text-wrapper">
                <p className="font-title-medium emotion-time-text">
                  <span className="highlight happy">
                    {emotionTimeData.happy}
                  </span>
                  초 동안 웃었어요.
                </p>
                <p className="font-title-medium emotion-time-text">
                  <span className="highlight sad">{emotionTimeData.sad}</span>초
                  동안 슬펐어요.
                </p>
                <p className="font-title-medium emotion-time-text">
                  <span className="highlight surprise">
                    {emotionTimeData.surprise}
                  </span>
                  초 동안 놀랐어요.
                </p>
                <p className="font-title-medium emotion-time-text">
                  <span className="highlight angry">
                    {emotionTimeData.angry}
                  </span>
                  초 동안 화났어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
