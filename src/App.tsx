import { useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/Router';
import { useAuthStorage } from 'store/authStore';
import HeaderToken from 'api/HeaderToken';
import { getTempToken } from 'api/auth';
import { Helmet } from 'react-helmet-async';

function App() {
  const { access_token, setTempToken } = useAuthStorage(({ access_token, setTempToken }) => ({
    access_token,
    setTempToken,
  }));
  useLayoutEffect(() => {
    if (access_token) {
      HeaderToken.set(access_token);
      return;
    }
    getTempToken()
      .then((res) => {
        console.log('temp token');
        console.log(res);
        setTempToken({ access_token: res.data.new_temp_token });
      })
      .catch((err) => {
        console.log('temp token');
        console.log(err);
      });
  }, [access_token, setTempToken]);
  return (
    <div className="App">
      <Helmet>
        <title>FaceReview</title>
      </Helmet>
      <Router />
      <ToastContainer
        position="bottom-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="dark"
        limit={5} // 알람 개수 제한
      />
    </div>
  );
}

export default App;
