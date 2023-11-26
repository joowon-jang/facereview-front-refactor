import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import YouTube, { YouTubeEvent } from "react-youtube";
import EmotionBadge from "components/EmotionBadge/EmotionBadge";
import { Options, YouTubePlayer } from "youtube-player/dist/types";
import "./watchpage.scss";
import { socket } from "socket";
import React from "react";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import TextInput from "components/TextInput/TextInput";
import UploadButton from "components/UploadButton/UploadButton";
import { ResponsiveBar } from "@nivo/bar";
import { CommentType, EmotionType, VideoDetailType } from "types";
import { getRelatedVideo, getVideoDetail } from "api/youtube";
import Devider from "components/Devider/Devider";
import { useAuthStorage } from "store/authStore";
import { toast } from "react-toastify";
import { getVideoComments, sendNewComment } from "api/watch";
import { getTimeToString, mapNumberToEmotion } from "utils/index";

const WatchPage = (): ReactElement => {
  const isMobile = window.innerWidth < 1200;
  const { id } = useParams();
  const opts: Options = isMobile
    ? {
        width: "100%",
        height: `${window.innerWidth * (9 / 16)}px`,
        playerVars: {
          autoplay: 1,
          color: "white",
          rel: 0,
        },
      }
    : {
        width: 852,
        height: 480,
        playerVars: {
          autoplay: 1,
          color: "white",
          rel: 0,
        },
      };
  const { is_sign_in, access_token, user_profile } = useAuthStorage();
  const navigation = useNavigate();

  const webcamRef = useRef<Webcam>(null);
  const webcamOptions = {
    width: 320,
    height: 180,
  };

  const [graphData, setGraphData] = useState([
    {
      happy: 48,
      happyColor: "#FF4D8D",
      sad: 12,
      sadColor: "#479CFF",
      surprise: 5,
      surpriseColor: "#92C624",
      angry: 17,
      angryColor: "#FF6B4B",
      neutral: 18,
      neutralColor: "#393946",
    },
  ]);
  const [video, setVideo] = useState<YouTubePlayer | null>(null);
  const [videoData, setVideoData] = useState<VideoDetailType>();
  const [currentMyEmotion, setCurrentMyEmotion] =
    useState<EmotionType>("neutral");
  const [currentOthersEmotion, setCurrentOthersEmotion] =
    useState<EmotionType>("neutral");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() || "";
    return imageSrc?.split(",")[1];
  }, [webcamRef]);

  const handleVideoReady = (e: YouTubeEvent<any>) => {
    setVideo(e.target);
  };

  const getCurrentTimeString = (seconds: number): string => {
    let remainSeconds = seconds;

    const resHours = Math.floor(remainSeconds / (60 * 60))
      .toString()
      .padStart(1, "0");
    remainSeconds = remainSeconds % (60 * 60);

    const resMinutes = Math.floor(remainSeconds / 60)
      .toString()
      .padStart(2, "0");
    remainSeconds = remainSeconds % 60;

    const resSeconds = Math.round(remainSeconds).toString().padStart(2, "0");

    return `${resHours}:${resMinutes}:${resSeconds}`;
  };

  const handleCommentSubmit = () => {
    if (is_sign_in) {
      if (comment.length > 0) {
        sendNewComment({
          comment_contents: comment,
          youtube_url: id || "",
        })
          .then((res) => {
            getVideoComments({ youtube_url: id || "" })
              .then((res) => {
                setCommentList(res);
              })
              .catch((err) => {});
            setComment("");
          })
          .catch((err) => {
            toast.error("댓글이 달리지 않았어요.", {
              toastId: "error new comment",
            });
          });
      }
      return;
    }
    toast.warn("로그인이 필요합니다.", { toastId: "need sign in" });
    navigation("/auth/1");
  };

  useLayoutEffect(() => {
    getVideoDetail({ youtube_url: id || "" })
      .then((res) => {
        setVideoData(res);

        getVideoComments({ youtube_url: id || "" })
          .then((res) => {
            console.log(res);
            setCommentList(res);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
    getRelatedVideo({ youtube_url: id || "" })
      .then((res) => {
        console.log("related", res);
      })
      .catch((err) => {});
  }, [id]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      capture();
    }, 200);

    const frameDataInterval = setInterval(async () => {
      const capturedImage = await capture();
      const currentTime = await video?.getCurrentTime();
      const formattedCurrentTime = getCurrentTimeString(currentTime || 0);

      socket.emit(
        "client_message",
        {
          cur_access_token: access_token,
          youtube_running_time: formattedCurrentTime,
          string_frame_data: capturedImage,
          youtube_index: videoData?.youtube_index,
        },
        (response: {
          happy: number;
          sad: number;
          surprise: number;
          angry: number;
          neutral: number;
          most_emotion: EmotionType;
        }) => {
          setCurrentMyEmotion(response.most_emotion);
          setGraphData([
            {
              ...graphData[0],
              happy: response.happy,
              sad: response.sad,
              surprise: response.surprise,
              angry: response.angry,
              neutral: response.neutral,
            },
          ]);
        }
      );
    }, 1000);

    return () => {
      clearInterval(frameDataInterval);
      clearInterval(captureInterval);
    };
  }, [access_token, capture, graphData, video, videoData?.youtube_index]);

  const CommentItem = ({
    user_name,
    comment_date,
    comment_contents,
    user_profile,
  }: CommentType): ReactElement => {
    return (
      <div className="comment-item-container">
        <ProfileIcon
          type={"icon-small"}
          color={mapNumberToEmotion(user_profile)}
          style={{ marginRight: "12px" }}
        />
        <div className="comment-text-wrapper">
          <div className="comment-info-wrapper">
            <div className="comment-nickname font-label-small">{user_name}</div>
            <div className="comment-time-text font-label-small">
              {comment_date}
            </div>
          </div>
          <div className="comment-text font-body-medium">
            {comment_contents}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="watch-page-container">
      <div className="main-container">
        <div className="watch-page-test">
          <YouTube
            videoId={id}
            // id={string} // defaults -> ''
            // className={string} // defaults -> ''
            // iframeClassName={string} // defaults -> ''
            style={{ marginBottom: "20px" }} // defaults -> {}
            // title={string} // defaults -> ''
            // loading={string} // defaults -> undefined
            opts={opts} // defaults -> {}
            onReady={handleVideoReady} // defaults -> noop
            // onPlay={func} // defaults -> noop
            // onPause={func} // defaults -> noop
            // onEnd={func} // defaults -> noop
            // onError={func} // defaults -> noop
            // onStateChange={func} // defaults -> noop
            // onPlaybackRateChange={func} // defaults -> noop
            // onPlaybackQualityChange={func} // defaults -> noop
          />
          <div
            className={
              isMobile ? "title font-title-small" : "title font-title-medium"
            }
          >
            {videoData?.youtube_title}
          </div>
          {isMobile && <Devider />}
        </div>

        {isMobile && (
          <div className="watch-page-cam-container">
            <Webcam
              style={{ borderRadius: "8px", marginBottom: "24px" }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={webcamOptions}
              mirrored={true}
              screenshotQuality={0.5}
            />
            <div className="my-emotion-container">
              <div className="my-emotion-title-wrapper">
                <h4 className="my-emotion-title font-title-small">
                  실시간 나의 감정
                </h4>
                <EmotionBadge type="big" emotion={currentMyEmotion} />
              </div>
              <div className="graph-container">
                <ResponsiveBar
                  data={graphData}
                  keys={["happy", "sad", "surprise", "angry", "neutral"]}
                  indexBy="country"
                  padding={0.3}
                  layout="horizontal"
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={[
                    "#FF4D8D",
                    "#479CFF",
                    "#92C624",
                    "#FF6B4B",
                    "#393946",
                  ]}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={null}
                  axisLeft={null}
                  enableGridY={false}
                  enableLabel={false}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 2.3]],
                  }}
                  margin={{ top: -10, bottom: -10 }}
                  legends={[]}
                  role="application"
                  ariaLabel="Nivo bar chart demo"
                  barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  }
                />
              </div>
            </div>
            <div className="others-emotion-container">
              <div className="others-emotion-title-wrapper">
                <h4 className="others-emotion-title font-title-small">
                  실시간 다른 사람들의 감정
                </h4>
                <EmotionBadge type="big" emotion={currentOthersEmotion} />
              </div>
            </div>
          </div>
        )}

        <div className="comment-container">
          <div className="comment-input-container">
            <ProfileIcon
              type={"icon-medium"}
              color={mapNumberToEmotion(user_profile)}
              style={{ marginRight: "12px" }}
            />
            <TextInput
              inputType="underline"
              value={comment}
              onChange={setComment}
              placeholder={"영상에 대한 의견을 남겨보아요"}
            />
            <UploadButton
              onClick={handleCommentSubmit}
              style={{
                marginLeft: "12px",
                display: comment.length > 0 ? "block" : "none",
              }}
            />
          </div>
          <div
            className={
              isMobile
                ? "comment-info-text font-title-mini"
                : "comment-info-text font-title-small"
            }
          >
            댓글 {commentList.length || 0}개
          </div>
          <div className="comment-list-container">
            {commentList.length > 0 ? (
              commentList.map((comment, idx) => (
                <CommentItem
                  key={`comment-${comment.comment_contents}-${idx}`}
                  user_name={comment.user_name}
                  comment_date={getTimeToString(comment.comment_date)}
                  comment_contents={comment.comment_contents}
                  user_profile={comment.user_profile}
                  comment_index={comment.comment_index}
                  modify_check={comment.modify_check}
                />
              ))
            ) : (
              <p className="no-comments-text font-label-large">
                아직 댓글이 없어요
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="side-container">
        {!isMobile && (
          <>
            <Webcam
              style={{ borderRadius: "8px", marginBottom: "24px" }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={webcamOptions}
              mirrored={true}
              screenshotQuality={0.5}
            />
            <div className="my-emotion-container">
              <div className="my-emotion-title-wrapper">
                <h4 className="my-emotion-title font-title-small">
                  실시간 나의 감정
                </h4>
                <EmotionBadge type="big" emotion={currentMyEmotion} />
              </div>
              <div className="graph-container">
                <ResponsiveBar
                  data={graphData}
                  keys={["happy", "sad", "surprise", "angry", "neutral"]}
                  indexBy="country"
                  padding={0.3}
                  layout="horizontal"
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={[
                    "#FF4D8D",
                    "#479CFF",
                    "#92C624",
                    "#FF6B4B",
                    "#393946",
                  ]}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={null}
                  axisLeft={null}
                  enableGridY={false}
                  enableLabel={false}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 2.3]],
                  }}
                  margin={{ top: -10, bottom: -10 }}
                  legends={[]}
                  role="application"
                  ariaLabel="Nivo bar chart demo"
                  barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  }
                />
              </div>
            </div>
            <div className="others-emotion-container">
              <div className="others-emotion-title-wrapper">
                <h4 className="others-emotion-title font-title-small">
                  실시간 다른 사람들의 감정
                </h4>
                <EmotionBadge type="big" emotion={currentOthersEmotion} />
              </div>
            </div>
          </>
        )}
        <div className="recommend-container">
          <h4 className="recommend-title font-title-small">
            이 영상은 어때요?
          </h4>
          <div className="recommend-video-container">
            {/* {recommendVideoIds.map((v) => (
              <VideoItem
                key={`recommendVideo${v}`}
                src={`https://www.youtube.com/embed/${v}`}
                width={320}1
                videoId={v}
                style={{ marginBottom: "24px" }}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
