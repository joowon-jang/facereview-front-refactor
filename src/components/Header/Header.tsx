import Button from "components/Button/Button";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "store/authStore";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./header.scss";

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const { is_sign_in, user_profile } = useAuthStorage();

  return (
    <div className="header">
      <AnimatedLogo
        animationType="infinite"
        animatedWrapperWidth={30}
        gap={3}
        style={{ height: "35px" }}
      />
      {is_sign_in ? (
        <button
          className="header-profile-icon-button"
          onClick={() => {
            navigate("/my");
          }}
        >
          <ProfileIcon type={"icon-medium"} color={"neutral"} />
        </button>
      ) : (
        <Button
          label="로그인"
          type="small"
          onClick={() => navigate("/auth/1")}
        ></Button>
      )}
    </div>
  );
};

export default Header;
