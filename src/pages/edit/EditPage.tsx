import { changeFavoriteGenre, changeName, changeProfilePhoto } from 'api/auth';
import Button from 'components/Button/Button';
import CategoryList from 'components/CategoryList/CategoryList';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import ProfileIcon from 'components/ProfileIcon/ProfileIcon';
import TextInput from 'components/TextInput/TextInput';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStorage } from 'store/authStore';
import { CategoryType, EmotionType } from 'types';
import { mapEmotionToNumber, mapNumberToEmotion } from 'utils/index';
import './editpage.scss';

const EditPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const { user_name, setUserName, setUserProfile, user_favorite_genres, setUserFavoriteGenres, user_profile } =
    useAuthStorage(
      ({ user_name, setUserName, setUserProfile, user_favorite_genres, setUserFavoriteGenres, user_profile }) => ({
        user_name,
        setUserName,
        setUserProfile,
        user_favorite_genres,
        setUserFavoriteGenres,
        user_profile,
      })
    );
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(user_name);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(user_favorite_genres as CategoryType[]);
  const [profileColor, setProfileColor] = useState<EmotionType>(mapNumberToEmotion(user_profile));
  const [selectedColor, setSelectedColor] = useState<EmotionType>(mapNumberToEmotion(user_profile));
  const [localProfileColor, setLocalProfileColor] = useState<EmotionType>(mapNumberToEmotion(user_profile));

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
          toast.success('프로필사진이 변경되었어요', {
            toastId: 'success change profile image',
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

          navigate('/my');
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
          setUserFavoriteGenres({ user_favorite_genres: selectedCategories });
          toast.success('회원정보가 수정되었어요', {
            toastId: 'success change info',
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
      <div className="edit-page-container">
        <h2 className="font-title-large">프로필 편집</h2>
        <div className="edit-page-user-container">
          <ProfileIcon type={'icon-large'} color={localProfileColor} isEditable={true} onEditClick={openModal} />
          <ModalDialog
            type={'one-button'}
            name="edit-page-modal"
            isOpen={isModalOpen}
            onClose={closeModal}
            onCheck={handleModalCheck}>
            <h3 className="font-title-mini edit-page-modal-title">아이콘을 선택해주세요</h3>
            <div className="edit-page-modal-icon-wrapper">
              <ProfileIcon
                type="icon-medium"
                color="neutral"
                onSelectClick={() => handleColorSelect('neutral')}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  border: selectedColor === 'neutral' ? '3px solid #76FFCE' : 'none',
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="happy"
                onSelectClick={() => handleColorSelect('happy')}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  border: selectedColor === 'happy' ? '3px solid #76FFCE' : 'none',
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="surprise"
                onSelectClick={() => handleColorSelect('surprise')}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  border: selectedColor === 'surprise' ? '3px solid #76FFCE' : 'none',
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="sad"
                onSelectClick={() => handleColorSelect('sad')}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  border: selectedColor === 'sad' ? '3px solid #76FFCE' : 'none',
                }}
              />
              <ProfileIcon
                type="icon-medium"
                color="angry"
                onSelectClick={() => handleColorSelect('angry')}
                style={{
                  cursor: 'pointer',
                  border: selectedColor === 'angry' ? '3px solid #76FFCE' : 'none',
                }}
              />
            </div>
          </ModalDialog>
          <div className="edit-page-edit-container">
            <div className="edit-page-input-container">
              <label htmlFor="editNickName font-title-mini">닉네임</label>
              <TextInput
                id={'editNickName'}
                value={nickName}
                onChange={setNickName}
                placeholder={'하하호호'}
                style={
                  isMobile
                    ? {
                        width: window.innerWidth - 32,
                        marginTop: '16px',
                        marginBottom: '24px',
                      }
                    : {
                        width: '380px',
                        marginTop: '16px',
                        marginBottom: '48px',
                      }
                }
              />
              {nickName.length < 2 && (
                <p className="edit-page-input-alert-message font-body-large">최소 2자이상 입력해주세요.</p>
              )}
            </div>
            <div className="edit-page-category-wrapper">
              <label htmlFor="editNickName font-title-mini" style={{ marginBottom: '20px' }}>
                관심사 (3개 선택)
              </label>
              <div className="category-wrapper" style={{ marginTop: '20px' }}>
                <CategoryList selected={selectedCategories} setSelected={setSelectedCategories} />
              </div>
            </div>
          </div>
        </div>

        <Button
          label="수정"
          type="cta-full"
          style={
            isMobile ? { width: window.innerWidth - 32, marginTop: '16px' } : { width: '380px', marginTop: '16px' }
          }
          isDisabled={nickName.length < 2 || selectedCategories.length < 3}
          onClick={handleEditButtonClick}
        />
      </div>
    </>
  );
};

export default EditPage;
