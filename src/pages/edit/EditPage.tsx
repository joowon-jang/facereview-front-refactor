import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "components/Button/Button";
import TextInput from "components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import "./editpage.scss";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import ModalDialog from "components/ModalDialog/ModalDialog";
import { EmotionType } from "types";
import { useAuthStorage } from "store/authStore";
import { changeName, changeProfilePhoto } from "api/auth";
import { mapEmotionToNumber, mapNumberToEmotion } from "utils/index";

const EditPage = () => {
  const { is_sign_in, user_name, user_profile, setUserName, setUserProfile } =
    useAuthStorage();
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [profileColor, setProfileColor] = useState<EmotionType>(
    mapNumberToEmotion(user_profile)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorChange = (color: EmotionType) => {
    setProfileColor(color);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    changeProfilePhoto({ new_profile: mapEmotionToNumber(profileColor) })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUserProfile({ user_profile: res.data.user_profile });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalOpen(false);
  };

  const handleEditButtonClick = () => {
    changeName({ new_name: nickName })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUserName({ user_name: res.data.user_name });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  useEffect(() => {
    // if (is_sign_in) {
    // } else {
    //   navigate("/auth/1");
    // }
  }, []);

  return (
    <>
      <div className="editpage-container">
        <h2 className="font-title-large">프로필 편집</h2>
        <div className="editpage-user-container">
          <ProfileIcon
            type={"icon-large"}
            color={profileColor}
            isEditable={true}
            onEditClick={openModal}
          />
          <ModalDialog
            type={"one-button"}
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <h3
              className="font-title-mini editpage-modal-title"
              style={{ marginBottom: "24px" }}
            >
              아이콘을 선택해주세요
            </h3>
            <div
              className="editpage-modal-icon-wrapper"
              style={{ display: "flex", gap: "10px", marginBottom: "12px" }}
            >
              <ProfileIcon
                type="icon-medium"
                color="neutral"
                onSelectClick={() => {
                  handleColorChange("neutral");
                }}
                style={{ cursor: "pointer" }}
              />
              <ProfileIcon
                type="icon-medium"
                color="happy"
                onSelectClick={() => {
                  handleColorChange("happy");
                }}
                style={{ cursor: "pointer" }}
              />
              <ProfileIcon
                type="icon-medium"
                color="surprise"
                onSelectClick={() => {
                  handleColorChange("surprise");
                }}
                style={{ cursor: "pointer" }}
              />
              <ProfileIcon
                type="icon-medium"
                color="sad"
                onSelectClick={() => {
                  handleColorChange("sad");
                }}
                style={{ cursor: "pointer" }}
              />
              <ProfileIcon
                type="icon-medium"
                color="angry"
                onSelectClick={() => {
                  handleColorChange("angry");
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </ModalDialog>
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
