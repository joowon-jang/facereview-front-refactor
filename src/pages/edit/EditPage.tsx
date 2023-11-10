import { useState } from "react";
import Button from "components/Button/Button";
import TextInput from "components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import "./editpage.scss";

const EditPage = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");

  return (
    <>
      <div className="editpage-container">
        <h2 className="font-title-large">프로필 편집</h2>
        <div className="editpage-user-info-container">
          <img className="editpage-user-icon" src="" /> {/* 아이콘자리 */}
          <div className="editpage-input-container">
            <label
              htmlFor="nickName"
              className="editpage-input-label font-title-mini"
            >
              닉네임
            </label>
            <TextInput
              id="editNickName"
              value={nickName}
              onChange={setNickName}
              placeholder="하하호호"
            />
          </div>
          <div className="edit-page-alert">
            <p className="editpage-input-alert-message font-body-large">
              닉네임이 중복돼요
            </p>
          </div>
        </div>
        <div>
          <Button
            label="수정"
            type="cta-full"
            style={{ marginTop: "80px" }}
            isDisabled={nickName === ""}
            onClick={() => navigate("/my")}
          />
        </div>
      </div>
    </>
  );
};

export default EditPage;
