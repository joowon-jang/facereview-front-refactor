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
      id: "temp.",
      ranges: [55, 31, 53, 0, 120],
      measures: [27],
      markers: [80],
    },
    {
      id: "power",
      ranges: [
        1.0936759376302752, 0.37145682819019316, 1.5463633441210725, 0, 2,
      ],
      measures: [0.13969369267394954, 0.7913675599256789],
      markers: [1.2101494115840372],
    },
    {
      id: "volume",
      ranges: [2, 57, 2, 42, 11, 25, 0, 60],
      measures: [47],
      markers: [52],
    },
    {
      id: "cost",
      ranges: [193793, 164293, 174995, 0, 500000],
      measures: [97749, 302766],
      markers: [306365],
    },
    {
      id: "revenue",
      ranges: [1, 3, 5, 0, 9],
      measures: [8],
      markers: [6.308684233669997, 6.128119615854916],
    },
  ];
  const [camImgURL, setCamImgURL] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log("imageSrc", imageSrc);
      setCamImgURL(imageSrc);
    }
    return imageSrc;
  }, [webcamRef]);

  useEffect(() => {
    setInterval(() => {
      capture();
      console.log(camImgURL);
    }, 5000);
    socket.connect();
    console.log(socket);
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
          <div className="graph-conatiner">
            <ResponsiveBullet
              data={myGraphData}
              margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
              spacing={46}
              titleAlign="start"
              titleOffsetX={-70}
              measureSize={0.2}
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
