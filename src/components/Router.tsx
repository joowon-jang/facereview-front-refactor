import WatchPage from "pages/watch/WatchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import MainPage from "../pages/main/MainPage";
import ScreenContainer from "./ScreenContainer/ScreenContainer";
import MyPage from "../pages/my/MyPage";
import EditPage from "../pages/edit/EditPage";
import TutorialPage from "pages/tutorial/TutorialPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ScreenContainer headerShown={true} />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="*" element={<MainPage />} />
        </Route>
        <Route element={<ScreenContainer headerShown={false} />}>
          <Route path="/tutorial/:step" element={<TutorialPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
