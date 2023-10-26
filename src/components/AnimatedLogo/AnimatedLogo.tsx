import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import logoR from "assets/img/logoR.png";
import "./animatedlogo.scss";

type AnimatedLogoPropType = {
  animationType: "infinite" | "once";
  animatedWrapperWidth: number;
  gap: number;
  style?: React.CSSProperties;
};

const AnimatedLogo = ({
  animationType,
  animatedWrapperWidth,
  gap,
  style,
}: AnimatedLogoPropType): ReactElement => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      className="animated-logo-container"
      style={style}
      onClick={handleLogoClick}
    >
      <div
        className={`animated-bar-wrapper ${"animated-" + animationType}`}
        style={{ width: `${animatedWrapperWidth}px`, marginRight: `${gap}px` }}
      >
        <div className="animated-bar animated-bar-1"></div>
        <div className="animated-bar animated-bar-2"></div>
        <div className="animated-bar animated-bar-3"></div>
      </div>
      <img src={logoR} alt="" className="logoR" />
    </div>
  );
};

export default AnimatedLogo;
