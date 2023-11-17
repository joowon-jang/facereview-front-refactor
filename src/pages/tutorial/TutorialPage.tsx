import "./tutorialpage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ReactElement } from "react";

const AuthPage = (): ReactElement => {
  const { step } = useParams();
  const navigate = useNavigate();

  return (
    <div className="tutorial-container">
      <div className="tutorial-left-container">
        <div className="visual-wrapper"></div>
      </div>
      <div className="tutorial-right-container"></div>
    </div>
  );
};

export default AuthPage;
