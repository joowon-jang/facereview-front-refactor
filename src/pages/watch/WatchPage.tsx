import { ReactElement, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import YouTube, { YouTubeEvent } from "react-youtube";
import { ResponsiveBullet } from "@nivo/bullet";
import VideoItem from "components/VideoItem/VideoItem";
import EmotionBadge from "components/EmotionBadge/EmotionBadge";
import { Options, YouTubePlayer } from "youtube-player/dist/types";
import "./watchpage.scss";
import { socket } from "socket";
import React from "react";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import TextInput from "components/TextInput/TextInput";
import UploadButton from "components/UploadButton/UploadButton";
import { Bar, ResponsiveBar } from "@nivo/bar";

type CommentItemType = {
  color: "default" | "happy" | "surprise" | "sad" | "angry";
  nickname: string;
  commentTime: string;
  commentText: string;
};

const WatchPage = (): ReactElement => {
  const { id } = useParams();
  const opts: Options = {
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
  const recommendVideoIds = [
    "cVz_ArGCo-A",
    "my7FSr-0EPM",
    "paKZL7IWcHM",
    "dTBsPShaBro",
  ];
  const myGraphData = [
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
  ];
  const commentData: CommentItemType[] = [
    {
      color: "default",
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
  const [camImgURL, setCamImgURL] = useState("");
  const [comment, setComment] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log(imageSrc);
      setCamImgURL(imageSrc);
    }
    return imageSrc;
  }, [webcamRef]);

  const handleVideoReady = (e: YouTubeEvent<any>) => {
    console.log("onReady", e);
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

    const resSeconds = Math.floor(remainSeconds).toString().padStart(2, "0");

    const resMiliseconds = Math.floor((remainSeconds % 1) * 100)
      .toString()
      .slice(0, 2)
      .padStart(2, "0");

    return `${resHours}:${resMinutes}:${resSeconds}.${resMiliseconds}`;
  };

  useEffect(() => {
    socket.connect();
    socket.emit(
      "client_message",
      {
        youtube_running_time: "runningTime",
        string_frame_data:
          "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",

        watching_data_index: "watching_data_index",
        youtube_index: "youtube_index",
      },
      (response: any) => {
        console.log("client-message socket response *** ");
        console.log(response);
      }
    );

    // socket.emit(
    //   "socketcheck",
    //   {
    //     client_message: "socketcheck hi this is client",
    //   },
    //   (response: any) => {
    //     console.log("socketcheck socket response");
    //     console.log(response);
    //   }
    // );

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
    const interval = setInterval(async () => {
      const currentTime = await video?.getCurrentTime();
      capture();
      console.log(camImgURL);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [video]);

  const CustomTooltip = ({ formattedValue, id }: any): ReactElement => {
    return (
      <div className="graph-tooltip-container">
        <EmotionBadge type={"small"} emotion={id} />
      </div>
    );
  };

  const CommentItem = ({
    nickname,
    commentTime,
    commentText,
    color = "default",
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
        <div className="title font-title-medium">
          [문돼의 온도] EP.35 불여우와의 갈등
        </div>
        <div className="comment-container">
          <div className="comment-input-container">
            <ProfileIcon
              type={"icon-medium"}
              color={"default"}
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
          <div className="comment-info-text font-title-small">댓글 231개</div>
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
            <EmotionBadge type="big" emotion="happy" />
          </div>
          <div className="graph-container">
            <ResponsiveBar
              data={myGraphData}
              keys={["happy", "sad", "surprise", "angry", "neutral"]}
              indexBy="country"
              padding={0.3}
              layout="horizontal"
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={["#FF4D8D", "#92C624", "#479CFF", "#9F65FF", "#7C7E8C"]}
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
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
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
        <div className="recommend-container">
          <h4 className="recommend-title font-title-small">
            이 영상은 어때요?
          </h4>
          <div className="recommend-video-container">
            {recommendVideoIds.map((v) => (
              <VideoItem
                key={`recommendVideo${v}`}
                src={`https://www.youtube.com/embed/${v}`}
                width={320}
                videoId={v}
                style={{ marginBottom: "24px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
