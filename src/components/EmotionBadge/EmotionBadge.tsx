import { ReactElement } from "react";
import { emojiOfEmotion } from "utils";
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
  return (
    <div className={`emotion-badge-container ${type} ${emotion}`} style={style}>
      <p className={`emotion-emoji ${type}`}>{emojiOfEmotion[emotion]}</p>
    </div>
  );
};

export default EmotionBadge;
