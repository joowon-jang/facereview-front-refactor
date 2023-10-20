import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import MainPage from "../pages/main/MainPage";
import ScreenContainer from "./ScreenContainer/ScreenContainer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ScreenContainer />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
