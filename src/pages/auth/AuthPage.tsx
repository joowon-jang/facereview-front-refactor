import AnimatedLogo from 'components/AnimatedLogo/AnimatedLogo';
import Button from 'components/Button/Button';
import StepIndicator from 'components/StepIndicator/StepIndicator';
import TextInput from 'components/TextInput/TextInput';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { checkEmail, signIn, signUp } from 'api/auth';
import HeaderToken from 'api/HeaderToken';
import { AxiosResponse } from 'axios';
import CategoryList from 'components/CategoryList/CategoryList';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStorage } from 'store/authStore';
import { CategoryType, UserInfoType } from 'types';
import './authpage.scss';

const AlertMessages = {
  emailInvalid: '올바르지 않은 이메일 형식이에요',
  passwordInvalid: '최소 8자의 비밀번호를 입력해주세요',
  confirmPasswordInvalid: '동일한 비밀번호를 입력해주세요',
  nicknameInvalid: '최소 2자의 닉네임을 입력해주세요',
  categoryInvalid: '3개의 카테고리를 선택해주세요',
};
const MAX_CATEGORY_LENGTH = 3;
const AuthPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = +(step || 1);
  const setUserInfo = useAuthStorage(({ setUserInfo }) => setUserInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [emailAlertMessage, setEmailAlertMessage] = useState('');
  const [passwordAlertMessage, setPasswordAlertMessage] = useState('');
  const [confirmPasswordAlertMessage, setConfirmPasswordAlertMessage] = useState('');
  const [categoryAlertMessage, setCategoryAlertMessage] = useState('');
  const [nicknameAlertMessage, setNicknameAlertMessage] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSingInSuccess, setIsSingInSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    if (validateEmail(email) === null) {
      setEmailAlertMessage(AlertMessages.emailInvalid);
      navigate('/auth/1');
      return;
    }
    setEmailAlertMessage(' ');
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (password.length < 8) {
      setPasswordAlertMessage(AlertMessages.passwordInvalid);
      return;
    }
    setPasswordAlertMessage(' ');
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setConfirmPasswordAlertMessage(AlertMessages.confirmPasswordInvalid);
      return;
    }
    setConfirmPasswordAlertMessage(' ');
  };

  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
    if (nickname.length < 2) {
      setNicknameAlertMessage(AlertMessages.nicknameInvalid);
      return;
    }
    setNicknameAlertMessage(' ');
  };

  const handleSubmitButtonClick = () => {
    if (currentStep === 1) {
      if (email !== '' && emailAlertMessage === ' ') {
        checkEmail({ email_id: email }).then((res) => {
          if (res.status !== 200) {
            toast.info('회원가입을 도와드릴게요', {
              toastId: 'need signUp',
            });
          }
          setIsSignIn(res.status === 200);
          navigate('/auth/2');
        });
      }
      return;
    }
    if (currentStep === 2) {
      if (isSignIn) {
        if (password.length >= 8) {
          signIn({ email_id: email, password: password })
            .then(async (res: AxiosResponse<UserInfoType, any>) => {
              if (res.status === 200) {
                setIsSingInSuccess(true);
                HeaderToken.set(res.data.access_token);
                setUserInfo({
                  is_admin: +res.data.user_role === 2,
                  is_sign_in: true,
                  user_name: res.data.user_name,
                  user_profile: res.data.user_profile,
                  user_tutorial: res.data.user_tutorial,
                  access_token: res.data.access_token,
                  refresh_token: res.data.refresh_token,
                  user_favorite_genres: [
                    res.data.user_favorite_genre_1,
                    res.data.user_favorite_genre_2,
                    res.data.user_favorite_genre_3,
                  ],
                });

                setTimeout(() => {
                  if (res.data.user_tutorial) {
                    navigate('/');
                    return;
                  }
                  navigate('/tutorial/1');
                }, 400);
              }
            })
            .catch((err) => {
              toast.error('로그인 실패', { toastId: 'signIn fail' });
            });
        }
        return;
      }
      if (password.length >= 8 && password === confirmPassword) {
        navigate('/auth/3');
      }
    }
    if (currentStep === 3 && !isSignIn) {
      signUp({
        email_id: email,
        password: password,
        user_name: nickname,
        user_favorite_genre_1: categories[0],
        user_favorite_genre_2: categories[1],
        user_favorite_genre_3: categories[2],
      }).then((res: any) => {
        if (res.status === 200) {
          toast.success('가입되었어요', { toastId: 'signUp complete' });

          navigate('/auth');
        }
      });
    }
  };

  const getConfirmButtonLabel = () => {
    if (currentStep === 2 && isSignIn) {
      return '로그인';
    }
    if (currentStep === 3 && !isSignIn) {
      return '회원가입';
    }
    return '다음';
  };

  const isConfirmButtonVisible = () => {
    if (currentStep === 1 && emailAlertMessage === ' ') {
      return true;
    }
    if (currentStep === 2 && isSignIn && passwordAlertMessage === ' ') {
      return true;
    }
    if (currentStep === 2 && !isSignIn && passwordAlertMessage === ' ' && confirmPasswordAlertMessage === ' ') {
      return true;
    }
    if (currentStep === 3 && !isSignIn && nicknameAlertMessage === ' ' && categoryAlertMessage === ' ') {
      return true;
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      setCategoryAlertMessage('');
      return;
    }
    if (categories.length === MAX_CATEGORY_LENGTH) {
      setCategoryAlertMessage(' ');
      return;
    }
    setCategoryAlertMessage(AlertMessages.categoryInvalid);
  }, [categories]);

  return (
    <>
      <div className="auth-container">
        <StepIndicator step={isSingInSuccess ? 3 : currentStep} maxStep={3} />

        <div className="logo-wrapper">
          <AnimatedLogo animationType="once" animatedWrapperWidth={73} gap={7} style={{ height: '84px' }} />
        </div>

        <div className="input-container">
          {currentStep !== 3 ? (
            <div className="input-item-container">
              <label htmlFor="authEmail" className="input-label font-title-mini">
                이메일 주소
              </label>
              <TextInput
                id="authEmail"
                value={email}
                onChange={handleEmailChange}
                placeholder="ex) haha@facereview.com"
                autoFocus={true}
                isDisabled={currentStep > 1}
              />
              <p className="input-alert-message font-body-large">{emailAlertMessage}</p>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="input-item-container">
              <label htmlFor="authPassword" className="input-label font-title-mini">
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
              <p className="input-alert-message font-body-large">{passwordAlertMessage}</p>
            </div>
          ) : null}
          {currentStep === 2 && !isSignIn ? (
            <div className="input-item-container">
              <label htmlFor="authPasswordConfirm" className="input-label font-title-mini">
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
              <p className="input-alert-message font-body-large">{confirmPasswordAlertMessage}</p>
            </div>
          ) : null}
          {currentStep === 3 && !isSignIn ? (
            <>
              <div className="input-item-container">
                <label htmlFor="authNickname" className="input-label font-title-mini">
                  닉네임
                </label>
                <TextInput
                  id="authNickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="최소 2자의 닉네임을 입력해주세요"
                  maxLength={60}
                />
                <p className="input-alert-message font-body-large">{nicknameAlertMessage}</p>
              </div>
              <div className="input-item-container">
                <label htmlFor="authNickname" className="input-label font-title-mini">
                  관심 카테고리(3개 선택)
                </label>
                <div className="category-wrapper">
                  <CategoryList selected={categories} setSelected={setCategories} />
                </div>
                <p className="input-alert-message font-body-large">{categoryAlertMessage}</p>
              </div>
            </>
          ) : null}
          {isConfirmButtonVisible() ? (
            <Button
              label={getConfirmButtonLabel()}
              type="cta-full"
              style={{ marginTop: '48px' }}
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
