import { useState } from "react";
import logo from "../../assets/img/logo.svg";
import Button from "../../components/Button/Button";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import StepIndicator from "../../components/StepIndicator/StepIndicator";
import TextInput from "../../components/TextInput/TextInput";
import "./authpage.scss";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [indicatorStep, setIndicatorStep] = useState(1);

  return (
    <ScreenContainer>
      <div className="container">
        <StepIndicator step={indicatorStep} maxStep={3} />
        <img src={logo} alt="FaceReview" className="logo" />

        <div className="input-container">
          <label htmlFor="authEmail" className="input-label font-title-mini">
            이메일 주소
          </label>
          <TextInput
            id="authEmail"
            value={email}
            onChange={setEmail}
            placeholder="ex) haha@facereview.com"
          />
          <p className="input-alert-message font-body-large">
            올바르지 않은 이메일 형식이에요.
          </p>

          <Button label="다음" style={{ marginTop: "48px" }} />
        </div>
      </div>
    </ScreenContainer>
  );
};

export default AuthPage;
