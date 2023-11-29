import React, { useEffect, useState } from "react";
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
import VideoItem from "components/VideoItem/VideoItem";
import { getRecentVideo } from "api/youtube";
import { VideoWatchedType } from "types/index";
import { mapNumberToEmotion } from "utils/index";
import useWindowSize from "utils/useWindowSize";

const MyPage = () => {
  const { is_sign_in, user_name, user_profile } = useAuthStorage();

  const isMobile = useWindowSize();

  const navigate = useNavigate();
  const { setTempToken } = useAuthStorage();

  const [selectedEmotion, setSelectedEmotion] = useState("all");
  const [recentVideo, setRecentVideo] = useState<VideoWatchedType[]>([]);

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

  useEffect(() => {
    if (is_sign_in) {
      getRecentVideo()
        .then((data) => {
          setRecentVideo(data);
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
          <div className="my-page-emotion-graph-container"></div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
