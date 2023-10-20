import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import "./screencontainer.scss";

const ScreenContainer = (): ReactElement => {
  return (
    <div className="screen-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default ScreenContainer;
