import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "components/Button/Button";
import TextInput from "components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import "./editpage.scss";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import ModalDialog from "components/ModalDialog/ModalDialog";
import { CategoryType, EmotionType } from "types";
import { useAuthStorage } from "store/authStore";
import { changeFavoriteGenre, changeName, changeProfilePhoto } from "api/auth";
import { mapEmotionToNumber, mapNumberToEmotion } from "utils/index";
import CategoryList from "components/CategoryList/CategoryList";

const EditPage = () => {
  const { user_name, setUserName, setUserProfile, user_favorite_genres } =
    useAuthStorage();
  const user_profile = useAuthStorage((state) => state.user_profile);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(user_name);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    user_favorite_genres as CategoryType[]
  );
  const [profileColor, setProfileColor] = useState<EmotionType>(
    mapNumberToEmotion(user_profile)
  );
  const [selectedColor, setSelectedColor] = useState<EmotionType>(
    mapNumberToEmotion(user_profile)
  );
  const [localProfileColor, setLocalProfileColor] = useState<EmotionType>(
    mapNumberToEmotion(user_profile)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorSelect = (color: EmotionType) => {
    setSelectedColor(color);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleModalCheck = () => {
    setProfileColor(selectedColor);

    changeProfilePhoto({ new_profile: mapEmotionToNumber(profileColor) })
      .then((res) => {
        setLocalProfileColor(selectedColor);
        if (res.status === 200) {
          setUserProfile({ user_profile: mapEmotionToNumber(profileColor) });
          toast.success("프로필사진이 변경되었어요.", {
            toastId: "success change profile image",
          });
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
        if (res.status === 200) {
          setUserName({ user_name: nickName });

          navigate("/my");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    changeFavoriteGenre({
      user_favorite_genre_1: selectedCategories[0],
      user_favorite_genre_2: selectedCategories[1],
      user_favorite_genre_3: selectedCategories[2],
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("회원정보가 수정되었어요.", {
            toastId: "success change info",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setProfileColor(selectedColor);
  }, [selectedColor]);

  return (
    <>
      <div className="editpage-container">
        <h2 className="font-title-large">프로필 편집</h2>
        <div className="editpage-user-container">
          <ProfileIcon
            type={"icon-large"}
            color={localProfileColor}
            isEditable={true}
            onEditClick={openModal}
          />
          <ModalDialog
            type={"one-button"}
            isOpen={isModalOpen}
            onClose={closeModal}
            onCheck={handleModalCheck}
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
                onSelectClick={() => handleColorSelect("neutral")}
                style={{
                  cursor: "pointer",
                  border:
                    selectedColor === "neutral" ? "3px solid #76FFCE" : "none",
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="happy"
                onSelectClick={() => handleColorSelect("happy")}
                style={{
                  cursor: "pointer",
                  border:
                    selectedColor === "happy" ? "3px solid #76FFCE" : "none",
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="surprise"
                onSelectClick={() => handleColorSelect("surprise")}
                style={{
                  cursor: "pointer",
                  border:
                    selectedColor === "surprise" ? "3px solid #76FFCE" : "none",
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="sad"
                onSelectClick={() => handleColorSelect("sad")}
                style={{
                  cursor: "pointer",
                  border:
                    selectedColor === "sad" ? "3px solid #76FFCE" : "none",
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="angry"
                onSelectClick={() => handleColorSelect("angry")}
                style={{
                  cursor: "pointer",
                  border:
                    selectedColor === "angry" ? "3px solid #76FFCE" : "none",
                }}
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
              {nickName.length < 2 && (
                <p className="editpage-input-alert-message font-body-large">
                  최소 2자이상 입력해주세요.
                </p>
              )}
            </div>
            <div className="editpage-category-wrapper">
              <CategoryList
                selected={selectedCategories}
                setSelected={setSelectedCategories}
              />
            </div>
          </div>
        </div>

        <Button
          label="수정"
          type="cta-full"
          style={{ width: "380px", marginTop: "16px" }}
          isDisabled={nickName.length < 2 || selectedCategories.length < 3}
          onClick={handleEditButtonClick}
        />
      </div>
    </>
  );
};

export default EditPage;
