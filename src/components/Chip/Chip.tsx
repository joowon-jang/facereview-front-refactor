import React, { ReactElement } from "react";
import "./chip.scss";

type ChipPropsType = {
  type: "category-big" | "category-small";
  emotion: "all" | "happy" | "surprise" | "angry" | "sad";
  style?: React.CSSProperties;
  isSelected: boolean; // 추가된 isSelected prop
  onClick?: () => void;
};

const Chip = ({
  type,
  emotion,
  style,
  isSelected, // isSelected prop을 추가
  onClick,
}: ChipPropsType): ReactElement => {
  const fontOfType = {
    "category-big": "font-label-large",
    "category-small": "font-label-medium",
  };
  const labelOfEmotion = {
    all: "전체",
    happy: "😄 즐거운",
    surprise: "🫢 놀라운",
    angry: "😠 화나는",
    sad: "😥 슬픈",
  };

  // Create a class string based on the type and emotion
  const chipClass = `chip ${type} ${emotion} ${fontOfType[type]} ${
    isSelected ? "selected" : ""
  }`;

  return (
    <button className={chipClass} style={style} onClick={onClick}>
      {labelOfEmotion[emotion]}
    </button>
  );
};

export default Chip;
