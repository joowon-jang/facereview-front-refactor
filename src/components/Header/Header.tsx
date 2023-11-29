import Button from "components/Button/Button";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "store/authStore";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./header.scss";
import { mapNumberToEmotion } from "utils/index";
import useWindowSize from "utils/useWindowSize";

const Header = (): ReactElement => {
  const windowWidth = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(windowWidth < 1200);
  const navigate = useNavigate();
  const { is_sign_in } = useAuthStorage();
  const user_profile = useAuthStorage((state) => state.user_profile);

  useEffect(() => {
    setIsMobile(windowWidth < 1200);
  }, [windowWidth]);

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
            color={mapNumberToEmotion(user_profile)}
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
