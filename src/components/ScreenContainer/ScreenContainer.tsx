import { ReactElement } from "react";
import "./screencontainer.scss";

type ScreenContainerType = {
  children: ReactElement;
};

const ScreenContainer = ({ children }: ScreenContainerType): ReactElement => {
  return <div className="screen-container">{children}</div>;
};

export default ScreenContainer;
