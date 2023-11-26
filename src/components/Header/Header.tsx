import Button from "components/Button/Button";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "store/authStore";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./header.scss";

const Header = (): ReactElement => {
  const isMobile = window.innerWidth < 1200;
  const navigate = useNavigate();
  const { is_sign_in, user_profile } = useAuthStorage();

  return (
    <div className="header">
      <AnimatedLogo
        animationType="infinite"
        animatedWrapperWidth={isMobile ? 15 : 30}
        gap={3}
        style={isMobile ? { height: "18px" } : { height: "35px" }}
      />
      {is_sign_in ? (
        <button
          className="header-profile-icon-button"
          onClick={() => {
            navigate("/my");
          }}
        >
          <ProfileIcon
            type={isMobile ? "icon-small" : "icon-medium"}
            color={"neutral"}
          />
        </button>
      ) : (
        <Button
          label="로그인"
          type={isMobile ? "extra-small" : "small"}
          onClick={() => navigate("/auth/1")}
        ></Button>
      )}
    </div>
  );
};

export default Header;
