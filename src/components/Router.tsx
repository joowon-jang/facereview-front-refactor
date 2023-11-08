import WatchPage from "pages/watch/WatchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import MainPage from "../pages/main/MainPage";
import ScreenContainer from "./ScreenContainer/ScreenContainer";
import MyPage from "../pages/my/MyPage";
import EditPage from "../pages/edit/EditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ScreenContainer />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
