import { ReactElement, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import YouTube from "react-youtube";
import { ResponsiveBullet } from "@nivo/bullet";
import VideoItem from "components/VideoItem/VideoItem";
import EmotionBadge from "components/EmotionBadge/EmotionBadge";
import { Options } from "youtube-player/dist/types";
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
  const [camImgURL, setCamImgURL] = useState("");
  const [comment, setComment] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCamImgURL(imageSrc);
    }
    return imageSrc;
  }, [webcamRef]);

  useEffect(() => {
    setInterval(() => {
      capture();
    }, 5000);
    socket.connect();
    socket.emit(
      "client_message",
      {
        user_id: "civy",
        running_time: "00:00:01.10",
        frame_data: "ssibal null",
      },
      (response: any) => {
        console.log(response);
      }
    );
    socket.emit("test", { testmessage: "hello!!!" }, (response: any) => {
      console.log("test -----------------");
      console.log(response);
    });
    socket.on("response", (a) => {
      console.log("response -----------------");
      console.log(a);
    });
  }, []);

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
          // onReady={handleOnReady} // defaults -> noop
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
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={webcamOptions}
          style={{ borderRadius: "8px", marginBottom: "24px" }}
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
