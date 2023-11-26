import { getRequestedVideoList } from "api/request";
import { getDataFromYoutube } from "api/youtube";
import Button from "components/Button/Button";
import TextInput from "components/TextInput/TextInput";
import { ReactElement, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { ReqeustedVideoType } from "types/index";
import { getTimeArrFromDuration } from "utils/index";
import { Options } from "youtube-player/dist/types";

import "./adminpage.scss";

type registerVideoDataType = {
  youtube_url: string;
  youtube_title: string;
  youtube_channel: string;
  youtube_length_hour: number;
  youtube_length_minute: number;
  youtube_length_second: number;
};

const opts: Options = {
  width: 560,
  height: 316,
  playerVars: {
    color: "white",
    rel: 0,
  },
};

const MainPage = (): ReactElement => {
  const { v4: uuidv4 } = require("uuid");
  const [draftRequestedVideoList, setDraftRequestedVideoList] = useState<
    ReqeustedVideoType[]
  >([]);
  const [currentSelectedUrl, setCurrentSelectedUrl] = useState("");
  const [currentVideoData, setCurrentVideoData] =
    useState<registerVideoDataType>({
      youtube_url: "",
      youtube_title: "",
      youtube_channel: "",
      youtube_length_hour: 0,
      youtube_length_minute: 0,
      youtube_length_second: 0,
    });

  useEffect(() => {
    getDataFromYoutube({ youtube_url: currentSelectedUrl })
      .then((res) => {
        const [hour, minute, second] = getTimeArrFromDuration(
          res.items[0].contentDetails.duration
        );
        const temp = {
          youtube_url: res.items[0].id,
          youtube_title: res.items[0].snippet.title,
          youtube_channel: res.items[0].snippet.channelTitle,
          youtube_length_hour: hour,
          youtube_length_minute: minute,
          youtube_length_second: second,
        };
        setCurrentVideoData(temp);
      })
      .catch((err) => {});
  }, [currentSelectedUrl]);

  useEffect(() => {
    getRequestedVideoList()
      .then((res) => {
        setDraftRequestedVideoList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="admin-page-container">
      <div className="hot-contents-container">
        <h2 className="title font-title-large">영상추가 요청 관리</h2>
        <h4 className="subtitle font-title-small">
          리뷰어들이 추가요청한 영상들을 관리해주세요.
        </h4>
        <div className="selected-video-container">
          <YouTube
            videoId={currentSelectedUrl}
            style={{ marginBottom: "20px" }} // defaults -> {}
            opts={opts} // defaults -> {}
          />
          <div className="input-container"></div>
          <Button label={"등록하기"} type={"small"} />
        </div>
        <div className="request-video-container">
          {draftRequestedVideoList.map((d) => (
            <div
              key={uuidv4()}
              className="draft-url-item"
              onClick={() => setCurrentSelectedUrl(d.url)}
            >
              <p className="font-label-medium draft-url-text">{d.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
