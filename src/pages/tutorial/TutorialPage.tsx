import { ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./tutorialpage.scss";
import StepIndicator from "components/StepIndicator/StepIndicator";
import Button from "components/Button/Button";
import { toast } from "react-toastify";
import { tutorialComplete } from "api/auth";
import useWindowSize from "utils/useWindowSize";

const TUTORIAL_TEXT = [
  "",
  "다른 사람들이 영상을 보며 가장 많이 느낀 감정을 토대로 영상을 추천받아요.",
  "영상을 시청하며 보여지는 나의 생생한 표정이 실시간으로 기록돼요.",
  "영상을 많이 볼수록 내가 좋아할만한 영상을 더 정확히 추천받을 수 있어요.",
];

const AuthPage = (): ReactElement => {
  const isMobile = useWindowSize();
  const { step } = useParams();
  const navigate = useNavigate();

  const currentStep = +(step || 1);

  const handleSkipClick = async () => {
    tutorialComplete()
      .then((res) => {
        toast.success("튜토리얼 완료");
      })
      .catch((err) => {})
      .finally(() => {
        navigate("/");
      });
  };

  const handleContinueClick = () => {
    if (currentStep < 3) {
      navigate(`/tutorial/${currentStep + 1}`);
      return;
    }
    handleSkipClick();
  };

  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        {!isMobile && (
          <div className="tutorial-left-container">
            <div className="visual-wrapper"></div>
          </div>
        )}
        <div className="tutorial-right-container">
          {!isMobile && <StepIndicator step={currentStep} maxStep={3} />}
          <h6 className="step-title">{currentStep}</h6>
          <p className="tutorial-text font-title-large">
            {TUTORIAL_TEXT[currentStep]}
          </p>
          {isMobile && (
            <div className="tutorial-mobile-container">
              <div className="visual-wrapper"></div>
              <StepIndicator step={currentStep} maxStep={3} />{" "}
            </div>
          )}
          <div className="button-container">
            {currentStep !== 3 ? (
              <Button
                label={"건너뛰기"}
                type={"cta-fixed-secondary"}
                onClick={handleSkipClick}
              />
            ) : null}
            <Button
              label={currentStep === 3 ? "완료" : "다음"}
              type={currentStep === 3 ? "cta-full" : "cta-fixed"}
              onClick={handleContinueClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
