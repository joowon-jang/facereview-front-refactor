import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import MainPage from "../pages/main/MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
