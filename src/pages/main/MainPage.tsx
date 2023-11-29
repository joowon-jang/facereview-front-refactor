import { ReactElement, useEffect, useRef, useState } from "react";
import { useAuthStorage } from "store/authStore";
import VideoItem from "components/VideoItem/VideoItem";
import "./mainpage.scss";
import {
  getAllVideo,
  getCookVideo,
  getDramaVideo,
  getEatingVideo,
  getFearVideo,
  getGameVideo,
  getInformationVideo,
  getPersonalRecommendedVideo,
  getSportsVideo,
  getTravelVideo,
  getVarietyVideo,
} from "api/youtube";
import { EmotionType, VideoDataType } from "types";

import Chip from "components/Chip/Chip";
import ModalDialog from "components/ModalDialog/ModalDialog";
import TextInput from "components/TextInput/TextInput";
import { toast } from "react-toastify";
import youtubeIcon from "assets/img/youtubeIcon.png";
import Button from "components/Button/Button";
import SomeIcon from "components/SomeIcon/SomeIcon";
import { updateRequestVideoList } from "api/request";
import { getTimeToString } from "utils/index";
import useWindowSize from "utils/useWindowSize";

const MainPage = (): ReactElement => {
  const isMobile = useWindowSize();
  const { v4: uuidv4 } = require("uuid");
  const { is_sign_in, user_name } = useAuthStorage();
  const [selectedEmotion, setSelectedEmotion] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerInput, setRegisterInput] = useState("");
  const [registeringVideoId, setRegisteringVideoId] = useState("");
  const [registeredVideoIds, setRegisteredVideoIds] = useState<string[]>([]);
  const [isRegisterMatched, setIsRegisterMatched] = useState(false);
  const [allVideo, setAllVideo] = useState<VideoDataType[]>([]);
  const [personalRecommendedVideo, serPersonalRecommendedVideo] = useState<
    VideoDataType[]
  >([]);
  const [genreVideos, setGenreVideos] = useState<Array<VideoDataType>[]>(
    Array.from({ length: 9 }, () => [])
  );
  const filteredVideos = allVideo.filter(
    (v) =>
      selectedEmotion === "all" || v.youtube_most_emotion === selectedEmotion
  );
  const [genreCurrentIndex, setGenreCurrentIndex] = useState<number>(0);
  const [genreChangeTerm, setGenreChangeTerm] = useState<number | null>(null);
  const [genreChangeOpacity, setGenreChangeOpacity] = useState<number>(0);

  const getThumbnailUrl = (videoId: string) =>
    `http://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  const handleChipClick = (emotion: React.SetStateAction<string>) => {
    setSelectedEmotion(emotion);
  };

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
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
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          })
      );
    }
  };

  let timerId: NodeJS.Timeout;

  const useInterval = (
    callback: () => void,
    delay: number | null,
    test: number
  ) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        setGenreChangeOpacity(1);
        if (savedCallback.current) {
          savedCallback.current();
        }
      };

      if (delay !== null) {
        timerId = setTimeout(() => {
          setGenreChangeOpacity(0);
        }, 5800);
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay, test]);
  };

  useInterval(
    () => {
      setGenreCurrentIndex((prevIndex) => (prevIndex + 1) % genreVideos.length);
    },
    genreChangeTerm,
    genreCurrentIndex
  );

  useEffect(() => {
    setGenreChangeTerm(6000);
    getAllVideo()
      .then((data) => {
        setAllVideo(data);
      })
      .catch((err) => console.log(err));

    const userCategorization = is_sign_in ? "user" : "non-user";

    const videoRequests = [
      getSportsVideo({ user_categorization: userCategorization }),
      getGameVideo({ user_categorization: userCategorization }),
      getFearVideo({ user_categorization: userCategorization }),
      getInformationVideo({ user_categorization: userCategorization }),
      getVarietyVideo({ user_categorization: userCategorization }),
      getCookVideo({ user_categorization: userCategorization }),
      getTravelVideo({ user_categorization: userCategorization }),
      getEatingVideo({ user_categorization: userCategorization }),
      getDramaVideo({ user_categorization: userCategorization }),
    ];

    Promise.all(videoRequests)
      .then((dataArray) => {
        const updatedGenreVideo = dataArray.map((data) => data);
        setGenreVideos(updatedGenreVideo);
      })
      .catch((err) => {
        console.error(err);
      });

    if (is_sign_in) {
      getPersonalRecommendedVideo()
        .then((res) => {
          serPersonalRecommendedVideo(res);
        })
        .catch((err) => {
          console.log(
            "ERROR /home/user-customized-list ----------------------",
            err
          );
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
            {user_name}님이 좋아할{` `} {isMobile && <br />}
            오늘의 영상들을 골라봤어요.
          </h2>
          <h4
            className={
              isMobile
                ? "subtitle font-title-mini"
                : "subtitle font-title-small"
            }
          >
            시청 기록과 감정을 분석해서{` `}
            {isMobile && <br />}
            가장 좋아할 영상을 준비했어요.
          </h4>
          <div className="video-container">
            <div className="main-page-video-container">
              <div className="main-page-video-wrapper">
                {personalRecommendedVideo.map((v) => (
                  <VideoItem
                    type="small-emoji"
                    key={uuidv4()}
                    width={isMobile ? window.innerWidth - 48 : 280}
                    videoId={v.youtube_url}
                    videoTitle={v.youtube_title}
                    videoMostEmotion={v.youtube_most_emotion}
                    videoMostEmotionPercentage={v.youtube_most_emotion_per}
                    style={
                      isMobile
                        ? {
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            marginRight: "16px",
                          }
                        : { marginRight: "28px" }
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="genre-contents-container">
        <h2
          className={
            isMobile ? "title font-title-medium" : "title font-title-large"
          }
        >
          장르별 추천{` `}
          {isMobile && <br />}
          영상을 골라봤어요.
        </h2>
        <h4
          className={
            isMobile ? "subtitle font-title-mini" : "subtitle font-title-small"
          }
        >
          장르별로 가장 많이{` `}
          {isMobile && <br />}
          시청된 영상을 준비했어요.
        </h4>
        <div className="video-container">
          <div
            className="main-page-video-container"
            onMouseEnter={() => {
              clearInterval(setInterval(() => {}, 6000));
              setGenreChangeTerm(null);
              clearTimeout(timerId);
            }}
            onMouseLeave={() => setGenreChangeTerm(6000)}
            style={{
              opacity: genreChangeOpacity,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <div className="main-page-video-wrapper">
              {genreVideos[genreCurrentIndex].map((v) => (
                <VideoItem
                  type="small-emoji"
                  key={uuidv4()}
                  width={isMobile ? window.innerWidth - 48 : 280}
                  videoId={v.youtube_url}
                  videoTitle={v.youtube_title}
                  videoMostEmotion={v.youtube_most_emotion}
                  videoMostEmotionPercentage={v.youtube_most_emotion_per}
                  style={
                    isMobile
                      ? {
                          paddingTop: "14px",
                          paddingBottom: "14px",
                          marginRight: "16px",
                        }
                      : {
                          marginRight: "28px",
                        }
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hot-contents-container">
        <h2
          className={
            isMobile ? "title font-title-medium" : "title font-title-large"
          }
        >
          {is_sign_in ? (
            <div>
              {`${user_name}님을 위해 준비한 `}
              {isMobile && <br />}
              인기있는 영상이에요.
            </div>
          ) : (
            <div>
              감정별로 볼 수 있는{` `}
              {isMobile && <br />}
              영상을 추천해드릴게요.
            </div>
          )}
        </h2>
        <div className="video-container">
          <div className="main-page-chip-container">
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
          </div>
          <ModalDialog
            type={"one-button"}
            name="video-register-modal"
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
                  src={getThumbnailUrl(registeringVideoId)}
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
                  key={uuidv4()}
                  className="main-page-modal-thumbnail-registered"
                  src={getThumbnailUrl(v)}
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
                type="small-emoji"
                key={uuidv4()}
                width={isMobile ? window.innerWidth - 32 : 280}
                videoId={v.youtube_url}
                videoTitle={v.youtube_title}
                videoMostEmotion={v.youtube_most_emotion}
                videoMostEmotionPercentage={v.youtube_most_emotion_per}
                style={
                  isMobile
                    ? { paddingTop: "14px", paddingBottom: "14px" }
                    : { marginRight: "28px", marginBottom: "56px" }
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
