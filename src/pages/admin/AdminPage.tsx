import { ReactElement } from "react";
import { useAuthStorage } from "store/authStore";
import "./adminpage.scss";

const MainPage = (): ReactElement => {
  const { is_sign_in, user_name } = useAuthStorage();

  return (
    <div className="admin-page-container">
      <div className="hot-contents-container">
        <h2 className="title font-title-large">영상추가 요청 관리</h2>
        <h4 className="subtitle font-title-small">
          리뷰어들이 추가요청한 영상들을 관리해주세요.
        </h4>
        <div className="video-container">
          <div className="button-wrapper"></div>
          <div className="video-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
