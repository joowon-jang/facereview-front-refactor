import { ReactElement, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import { EmotionType } from "types";
import { getVideoDetail } from "api/youtube";
import Devider from "components/Devider/Devider";

type CommentItemType = {
  color: EmotionType;
  nickname: string;
  commentTime: string;
  commentText: string;
};

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
      angryColor: "#9F65FF",
      neutral: 18,
      neutralColor: "#7C7E8C",
    },
  ]);
  const commentData: CommentItemType[] = [
    {
      color: "neutral",
      nickname: "닉네임뭐로하지",
      commentTime: "12분 전",
      commentText:
        "나영석 피디님을 보며 정말 놀랐던 이유는 어떻게 이런 사람들을 모아서 이런 케미를 이뤄 내지? 라는 생각이 들었을 때였습니다. 또한 제가 처음 나피디님을 알았던 1박2일 이후로 많은 시간이 지났지만 그 시대에 머물지 않고 뿅뿅 지구오락실에서 MZ세대와 같이 할 때도 그 세대의 문화를 수용하고 배우시려는 태도가 정말 존경스러웠습니다. 앞으로도 재밌는 예능 많이 부탁드립니다.",
    },
    {
      color: "sad",
      nickname: "하하호호",
      commentTime: "1일 전",
      commentText:
        "나영석피디를 서진씨가잘만난것이큰행운이라고본다 나영석피디화이팅이다 할머니팬",
    },
  ];
  const [video, setVideo] = useState<YouTubePlayer | null>(null);
  const [currentMyEmotion, setCurrentMyEmotion] =
    useState<EmotionType>("neutral");
  const [comment, setComment] = useState("");

  const capture = React.useCallback(async () => {
    const imageSrc = (await webcamRef.current?.getScreenshot()) || "";
    return imageSrc?.split(",")[1];
  }, [webcamRef]);

  const handleVideoReady = (e: YouTubeEvent<any>) => {
    setVideo(e.target);
  };

  const getCurrentTimeString = (seconds: number): string => {
    let remainSeconds = seconds;

    const resHours = Math.floor(remainSeconds / (60 * 60))
      .toString()
      .padStart(2, "0");
    remainSeconds = remainSeconds % (60 * 60);

    const resMinutes = Math.floor(remainSeconds / 60)
      .toString()
      .padStart(2, "0");
    remainSeconds = remainSeconds % 60;

    const resSeconds = Math.round(remainSeconds).toString().padStart(2, "0");

    return `${resHours}:${resMinutes}:${resSeconds}`;
  };

  useEffect(() => {
    getVideoDetail({ videoId: id || "" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    socket.connect();

    socket.emit(
      "test",
      {
        client_message: "test hi this is client",
      },
      (response: any) => {
        console.log("test socekt response");
        console.log(response);
      }
    );
  }, []);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      capture();
    }, 200);

    return () => {
      clearInterval(captureInterval);
    };
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const capturedImage = await capture();
      const currentTime = await video?.getCurrentTime();
      const formattedCurrentTime = getCurrentTimeString(currentTime || 0);

      socket.emit(
        "client_message",
        {
          youtube_running_time: { formattedCurrentTime },
          string_frame_data: capturedImage,

          watching_data_index: "watching_data_index",
          youtube_index: "youtube_index",
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
      clearInterval(interval);
    };
  }, [capture, graphData, video]);

  // const CustomTooltip = ({ formattedValue, id }: any): ReactElement => {
  //   return (
  //     <div className="graph-tooltip-container">
  //       <EmotionBadge type={"small"} emotion={id} />
  //     </div>
  //   );
  // };

  const CommentItem = ({
    nickname,
    commentTime,
    commentText,
    color = "neutral",
  }: CommentItemType): ReactElement => {
    return (
      <div className="comment-item-container">
        <ProfileIcon
          type={"icon-small"}
          color={color}
          style={{ marginRight: "12px" }}
        />
        <div className="comment-text-wrapper">
          <div className="comment-info-wrapper">
            <div className="comment-nickname font-label-small">{nickname}</div>
            <div className="comment-time-text font-label-small">
              {commentTime}
            </div>
          </div>
          <div className="comment-text font-body-medium">{commentText}</div>
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
            [문돼의 온도] EP.35 불여우와의 갈등
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
                    "#9F65FF",
                    "#7C7E8C",
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
                <EmotionBadge type="big" emotion="sad" />
              </div>
            </div>
          </div>
        )}

        <div className="comment-container">
          <div className="comment-input-container">
            <ProfileIcon
              type={"icon-medium"}
              color={"neutral"}
              style={{ marginRight: "12px" }}
            />
            <TextInput
              inputType="underline"
              value={comment}
              onChange={setComment}
              placeholder={"영상에 대한 의견을 남겨보아요"}
            />
            <UploadButton
              onClick={() => {}}
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
            댓글 231개
          </div>
          <div className="comment-list-container">
            {commentData.map((comment, idx) => (
              <CommentItem
                key={`comment-${comment.commentText}-${idx}`}
                nickname={comment.nickname}
                commentTime={comment.commentTime}
                commentText={comment.commentText}
                color={comment.color}
              />
            ))}
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
                    "#9F65FF",
                    "#7C7E8C",
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
                <EmotionBadge type="big" emotion="sad" />
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
                width={320}
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
