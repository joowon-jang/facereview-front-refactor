import { useState } from "react";
import { toast } from "react-toastify";
import Button from "components/Button/Button";
import TextInput from "components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import "./editpage.scss";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";

const EditPage = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");

  const handleEditButtonClick = () => {
    toast.success("회원정보가 수정되었습니다.", { toastId: "edit success" });

    navigate("/my");
  };

  return (
    <>
      <div className="editpage-container">
        <h2 className="font-title-large">프로필 편집</h2>
        <div className="editpage-user-container">
          <ProfileIcon
            type={"icon-large"}
            color={"default"}
            isEditable={true}
          />
          <div className="editpage-edit-container">
            <div className="editpage-input-container">
              <label htmlFor="editNickName">닉네임</label>
              <TextInput
                id={"editNickName"}
                value={nickName}
                onChange={setNickName}
                placeholder={"하하호호"}
                style={{
                  width: "380px",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              />
            </div>
            <p className="editpage-input-alert-message font-body-large">
              닉네임이 중복돼요
            </p>
          </div>
        </div>

        <Button
          label="수정"
          type="cta-full"
          style={{ width: "380px", marginTop: "48px" }}
          isDisabled={nickName === ""}
          onClick={handleEditButtonClick}
        />
      </div>
    </>
  );
};

export default EditPage;
