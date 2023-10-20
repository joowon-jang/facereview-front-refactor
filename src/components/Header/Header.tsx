import { ReactElement } from "react";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";

const Header = (): ReactElement => {
  return (
    <div className="header">
      <AnimatedLogo
        animationType="infinite"
        animatedWrapperWidth={30}
        gap={3}
        style={{ height: "35px" }}
      />
    </div>
  );
};

export default Header;
