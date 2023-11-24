import { ReactElement, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStorage } from "store/authStore";
import Header from "../Header/Header";

import "./screencontainer.scss";

const ScreenContainer = ({
  headerShown,
  isAdmin = false,
}: {
  headerShown: boolean;
  isAdmin?: boolean;
}): ReactElement => {
  const { is_admin } = useAuthStorage();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isAdmin && !is_admin) {
      toast.error("관리자 권한이 없어요.", { toastId: "not admin" });
      navigate("/");
    }
  });

  return (
    <div className="screen-container">
      {headerShown ? <Header /> : null}
      <Outlet />
    </div>
  );
};

export default ScreenContainer;
