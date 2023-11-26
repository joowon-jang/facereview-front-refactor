import { ReactElement, useEffect, useState } from "react";
import { useAuthStorage } from "store/authStore";
import StepIndicator from "components/StepIndicator/StepIndicator";
import VideoItem from "components/VideoItem/VideoItem";
import "./mainpage.scss";
import { getAllVideo, getPersonalRecommendedVideo } from "api/youtube";
import { VideoDataType } from "types";

import Chip from "components/Chip/Chip";
import ModalDialog from "components/ModalDialog/ModalDialog";
import TextInput from "components/TextInput/TextInput";
import { toast } from "react-toastify";
import youtubeIcon from "assets/img/youtubeIcon.png";
import Button from "components/Button/Button";
import SomeIcon from "components/SomeIcon/SomeIcon";
import { updateRequestVideoList } from "api/request";

const MainPage = (): ReactElement => {
  const { is_sign_in, user_name } = useAuthStorage();

  const isMobile = window.innerWidth < 1200;
  const [selectedEmotion, setSelectedEmotion] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerInput, setRegisterInput] = useState("");
  const [registeringVideoId, setRegisteringVideoId] = useState("");
  const [registeredVideoIds, setRegisteredVideoIds] = useState<string[]>([]);
  const [isRegisterMatched, setIsRegisterMatched] = useState(false);
  const recommendVideoIds = [
    "cVz_ArGCo-A",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
  ];

  const [personalVideoIndicator, setPersonalVideoIndicator] =
    useState<number>(1);
  const [allVideo, setAllVideo] = useState<VideoDataType[]>([]);

  const filteredVideos = allVideo.filter(
    (v) =>
      selectedEmotion === "all" || v.youtube_most_emotion === selectedEmotion
  );

  const handleChipClick = (emotion: React.SetStateAction<string>) => {
    setSelectedEmotion(emotion);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsRegisterMatched(false);
    setRegisterInput("");
    setRegisteringVideoId("");
    setRegisteredVideoIds([]);
  };

  const extractVideoId = () => {
    const match = registerInput.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );

    if (match && match[1]) {
      // match[1]에는 추출된 Video ID가 들어 있습니다.
      setRegisteringVideoId(match[1]);
      setIsRegisterMatched(true);
    } else {
      setIsRegisterMatched(false);
    }
  };

  const handleRegisterButtonClick = () => {
    if (registeredVideoIds.length > 0) {
      registeredVideoIds.map((videoId) =>
        updateRequestVideoList({ youtube_url_id: videoId })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }
  };

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

  useEffect(() => {
    extractVideoId();
  }, [registerInput]);

  return (
    <div className="main-page-container">
      {is_sign_in ? (
        <div className="personal-recommend-contents-container">
          <h2
            className={
              isMobile ? "title font-title-medium" : "title font-title-large"
            }
          >
            {user_name}님이 좋아할
            {isMobile && <br />}
            오늘의 영상들을 골라봤어요.
          </h2>
          <h4
            className={
              isMobile
                ? "subtitle font-title-mini"
                : "subtitle font-title-small"
            }
          >
            시청 기록과 감정을 분석해서
            {isMobile && <br />}
            가장 좋아할 영상을 준비했어요.
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
              {allVideo.map((v) => (
                <VideoItem
                  key={`recommendVideo${v}`}
                  width={isMobile ? window.innerWidth - 32 : 280}
                  videoId={v.youtube_url}
                  style={isMobile ? { marginBottom: "28px" } : {}}
                  videoTitle={v.youtube_title}
                  videoMostEmotion={"happy"}
                  videoMostEmotionPercentage={0}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="hot-contents-container">
        <h2
          className={
            isMobile ? "title font-title-medium" : "title font-title-large"
          }
        >
          {is_sign_in ? (
            <div>
              {`${user_name}님을 위해 준비한`} {isMobile && <br />}
              인기있는 영상이에요.
            </div>
          ) : (
            <div>
              감정별로 볼 수 있는
              {isMobile && <br />}
              영상을 추천해드릴게요.
            </div>
          )}
        </h2>
        <div className="video-container">
          <div className="chip-wrapper">
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
            <Chip
              type={isMobile ? "category-small" : "category-big"}
              choose={"plus"}
              onClick={openModal}
              style={
                isMobile ? { marginRight: "12px" } : { marginRight: "24px" }
              }
            />
          </div>
          <ModalDialog
            type={"video-register"}
            isOpen={isModalOpen}
            onClose={closeModal}
            onCheck={handleRegisterButtonClick}
          >
            <SomeIcon
              type={"close"}
              style={{ position: "absolute", top: "20px", right: "20px" }}
              onClick={closeModal}
            />
            <h2 className="main-page-modal-title font-title-medium">
              맞춤형 영상을 추천해드릴게요.
              <br />
              재미있게 본 영상을 추가해주세요.
            </h2>
            <div className="main-page-modal-input-container">
              <p className="main-page-modal-input-label font-title-mini">
                영상 링크를 첨부해주세요
              </p>
              <div className="main-page-modal-input-wrapper">
                <TextInput
                  value={registerInput}
                  inputType="underline"
                  onChange={setRegisterInput}
                  placeholder={
                    "ex) https://www.youtube.com/watch?v=3rfONMofiho"
                  }
                />
              </div>
            </div>
            <div className="main-page-modal-thumbnail-container">
              {isRegisterMatched ? (
                <img
                  className="main-page-modal-thumbnail-registering"
                  src={`http://img.youtube.com/vi/${registeringVideoId}/mqdefault.jpg`}
                  alt=""
                />
              ) : (
                <div className="main-page-modal-thumbnail-empty">
                  <img
                    className="main-page-modal-thumbnail-empty-image"
                    src={youtubeIcon}
                    alt="youtubeIcon"
                  />
                </div>
              )}

              {registeredVideoIds.map((v) => (
                <img
                  className="main-page-modal-thumbnail-registered"
                  src={`http://img.youtube.com/vi/${v}/mqdefault.jpg`}
                  alt=""
                />
              ))}
            </div>
            <Button
              label={""}
              type={"add"}
              style={{ position: "absolute", bottom: "128px" }}
              onClick={() => {
                setRegisteredVideoIds((prevIds) => [
                  ...prevIds,
                  registeringVideoId,
                ]);
                setRegisterInput("");
                setRegisteringVideoId("");
                setIsRegisterMatched(false);
              }}
              isDisabled={!isRegisterMatched}
            />
          </ModalDialog>

          <div className="video-wrapper">
            {filteredVideos.map((v) => (
              <VideoItem
                key={`videoItem${v.youtube_url}${v.youtube_most_emotion_per}`}
                src={`https://www.youtube.com/embed/${v.youtube_url}`}
                width={isMobile ? window.innerWidth - 32 : 280}
                videoId={v.youtube_url}
                style={
                  isMobile ? { marginBottom: "28px" } : { marginBottom: "56px" }
                }
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
