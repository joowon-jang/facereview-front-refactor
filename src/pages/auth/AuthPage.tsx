import { useState } from "react";
import { toast } from "react-toastify";
import AnimatedLogo from "components/AnimatedLogo/AnimatedLogo";
import Button from "components/Button/Button";
import StepIndicator from "components/StepIndicator/StepIndicator";
import TextInput from "components/TextInput/TextInput";
import "react-toastify/dist/ReactToastify.css";

import "./authpage.scss";
import { checkEmail, signIn, signUp } from "api/auth";
import { useNavigate } from "react-router-dom";

const AlertMessages = {
  emailInvalid: "올바르지 않은 이메일 형식이에요",
  passwordInvalid: "최소 8자의 비밀번호를 입력해주세요",
  confirmPasswordInvalid: "동일한 비밀번호를 입력해주세요",
  nicknameInvalid: "최소 2자의 닉네임을 입력해주세요",
};

const AuthPage = () => {
  const navigate = useNavigate();

  const [indicatorStep, setIndicatorStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [passwordAlertMessage, setPasswordAlertMessage] = useState("");
  const [confirmPasswordAlertMessage, setConfirmPasswordAlertMessage] =
    useState("");
  const [nicknameAlertMessage, setNicknameAlertMessage] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    if (validateEmail(email) === null) {
      setEmailAlertMessage(AlertMessages.emailInvalid);
      setIndicatorStep(1);
      return;
    }
    setEmailAlertMessage(" ");
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (password.length < 8) {
      setPasswordAlertMessage(AlertMessages.passwordInvalid);
      return;
    }
    setPasswordAlertMessage(" ");
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setConfirmPasswordAlertMessage(AlertMessages.confirmPasswordInvalid);
      return;
    }
    setConfirmPasswordAlertMessage(" ");
  };

  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
    if (nickname.length < 2) {
      setNicknameAlertMessage(AlertMessages.nicknameInvalid);
      return;
    }
    setNicknameAlertMessage(" ");
  };

  const handleSubmitButtonClick = () => {
    if (indicatorStep === 1) {
      if (email !== "" && emailAlertMessage === " ") {
        checkEmail({ email_id: email }).then((res) => {
          console.log(res.status);
          if (res.status !== 200) {
            toast.info("등록되지 않았어요. 회원가입을 해주세요!", {
              toastId: "need signUp",
            });
          }
          setIsSignIn(res.status === 200);
          setIndicatorStep(2);
        });
      }
      return;
    }
    if (indicatorStep === 2) {
      if (isSignIn) {
        if (password.length >= 8) {
          signIn({ email_id: email, password: password })
            .then((res) => {
              setIndicatorStep(3);
              if (res.status === 200) {
                toast.success("로그인 완료!", { toastId: "signIn success" });
                navigate("/");
              }
            })
            .catch((err) => {
              toast.error("로그인 실패!", { toastId: "signIn fail" });
            });
        }
        return;
      }
      if (password.length >= 8 && password === confirmPassword) {
        setIndicatorStep(3);
      }
    }
    if (indicatorStep === 3 && !isSignIn) {
      signUp({
        email_id: email,
        password: password,
        user_name: nickname,
        user_favorite_genre_1: "sports",
        user_favorite_genre_2: "drama",
        user_favorite_genre_3: "fear",
      }).then((res: any) => {
        if (res.status === 200) {
          toast.success("가입이 완료되었어요", { toastId: "signUp complete" });

          navigate("/auth");
        }
      });
    }
  };

  const getConfirmButtonLabel = () => {
    if (indicatorStep === 2 && isSignIn) {
      return "로그인";
    }
    if (indicatorStep === 3 && !isSignIn) {
      return "회원가입";
    }
    return "다음";
  };

  const isConfirmButtonVisible = () => {
    if (indicatorStep === 1 && emailAlertMessage === " ") {
      return true;
    }
    if (indicatorStep === 2 && isSignIn && passwordAlertMessage === " ") {
      return true;
    }
    if (
      indicatorStep === 2 &&
      !isSignIn &&
      passwordAlertMessage === " " &&
      confirmPasswordAlertMessage === " "
    ) {
      return true;
    }
    if (indicatorStep === 3 && !isSignIn && nicknameAlertMessage === " ") {
      return true;
    }
  };

  return (
    <>
      <div className="container">
        <StepIndicator step={indicatorStep} maxStep={3} />

        <div className="logo-wrapper">
          <AnimatedLogo
            animationType="once"
            animatedWrapperWidth={73}
            gap={7}
            style={{ height: "84px" }}
          />
        </div>

        <div className="input-container">
          {indicatorStep !== 3 ? (
            <div className="input-item-container">
              <label
                htmlFor="authEmail"
                className="input-label font-title-mini"
              >
                이메일 주소
              </label>
              <TextInput
                id="authEmail"
                value={email}
                onChange={handleEmailChange}
                placeholder="ex) haha@facereview.com"
                autoFocus={true}
                isDisabled={indicatorStep > 1}
              />
              <p className="input-alert-message font-body-large">
                {emailAlertMessage}
              </p>
            </div>
          ) : null}

          {indicatorStep === 2 ? (
            <div className="input-item-container">
              <label
                htmlFor="authPassword"
                className="input-label font-title-mini"
              >
                비밀번호
              </label>
              <TextInput
                id="authPassword"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="최소 8자의 비밀번호를 입력해주세요"
                maxLength={60}
              />
              <p className="input-alert-message font-body-large">
                {passwordAlertMessage}
              </p>
            </div>
          ) : null}
          {indicatorStep === 2 && !isSignIn ? (
            <div className="input-item-container">
              <label
                htmlFor="authPasswordConfirm"
                className="input-label font-title-mini"
              >
                비밀번호 확인
              </label>
              <TextInput
                id="authPasswordConfirm"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                maxLength={60}
              />
              <p className="input-alert-message font-body-large">
                {confirmPasswordAlertMessage}
              </p>
            </div>
          ) : null}
          {indicatorStep === 3 && !isSignIn ? (
            <div className="input-item-container">
              <label
                htmlFor="authNickname"
                className="input-label font-title-mini"
              >
                닉네임
              </label>
              <TextInput
                id="authNickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="최소 2자의 닉네임을 입력해주세요"
                maxLength={60}
              />
              <p className="input-alert-message font-body-large">
                {nicknameAlertMessage}
              </p>
            </div>
          ) : null}
          {isConfirmButtonVisible() ? (
            <Button
              label={getConfirmButtonLabel()}
              type="cta-full"
              style={{ marginTop: "48px" }}
              onClick={handleSubmitButtonClick}
              isDisabled={!isConfirmButtonVisible()}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
