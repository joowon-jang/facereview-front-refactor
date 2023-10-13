import logo from "../../assets/img/logo.svg";
import "./authpage.scss";

const AuthPage = () => {
  return (
    <>
      <div className="container">
        <div className="indicator-container">
          <div className="indicator active"></div>
          <div className="indicator"></div>
          <div className="indicator"></div>
        </div>
        <img src={logo} alt="FaceReview" className="logo" />
      </div>
    </>
  );
};

export default AuthPage;
