import { getRequestedVideoList } from "api/request";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useAuthStorage } from "store/authStore";
import { ReqeustedVideoType } from "types/index";
import "./adminpage.scss";

const MainPage = (): ReactElement => {
  const { is_sign_in, user_name } = useAuthStorage();
  const [requestedVideoList, setRequestedVideoList] = useState<
    ReqeustedVideoType[]
  >([]);

  useEffect(() => {
    getRequestedVideoList()
      .then((res) => {
        // axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=4Y4YSpF6d6w&key=AIzaSyAva4KgvWU_2Yjcz9g7Q8csTNzHYUc1KNM`)
        console.log(res);
        // setRequestedVideoList(res);
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
        <div className="request-video-container"></div>
      </div>
    </div>
  );
};

export default MainPage;
