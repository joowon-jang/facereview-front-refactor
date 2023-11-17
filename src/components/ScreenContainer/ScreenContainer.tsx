import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import "./screencontainer.scss";

const ScreenContainer = ({
  headerShown,
}: {
  headerShown: boolean;
}): ReactElement => {
  return (
    <div className="screen-container">
      {headerShown ? <Header /> : null}
      <Outlet />
    </div>
  );
};

export default ScreenContainer;
