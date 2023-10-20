import { useState } from "react";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo";
import Button from "../../components/Button/Button";
import StepIndicator from "../../components/StepIndicator/StepIndicator";
import TextInput from "../../components/TextInput/TextInput";
import "./authpage.scss";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [indicatorStep, setIndicatorStep] = useState(1);

  return (
    <>
      <div className="container">
        <StepIndicator step={indicatorStep} maxStep={3} />

        <AnimatedLogo
          animationType="once"
          animatedWrapperWidth={73}
          gap={7}
          style={{ height: "84px" }}
        />

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
    </>
  );
};

export default AuthPage;
