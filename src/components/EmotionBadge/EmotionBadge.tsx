import { ReactElement } from "react";
import "./emotionbadge.scss";

type EmotionBadgePropsType = {
  type: "big" | "small";
  emotion: "happy" | "surprise" | "angry" | "sad" | "neutral";
  style?: React.CSSProperties;
};

const EmotionBadge = ({
  type,
  emotion,
  style,
}: EmotionBadgePropsType): ReactElement => {
  const emojiOfEmotion = {
    happy: "😄",
    surprise: "🫢",
    angry: "😠",
    sad: "😥",
    neutral: "😐",
  };

  return (
    <div className={`emotion-badge-container ${type} ${emotion}`} style={style}>
      <p className="emotion-emoji">{emojiOfEmotion[emotion]}</p>
    </div>
  );
};

export default EmotionBadge;
