import Button from "components/Button/Button";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./header.scss";

const Header = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <AnimatedLogo
        animationType="infinite"
        animatedWrapperWidth={30}
        gap={3}
        style={{ height: "35px" }}
      />

      <Button
        label="로그인"
        type="small"
        onClick={() => navigate("/auth")}
      ></Button>
    </div>
  );
};

export default Header;
