import { EmotionType } from "types/index";

export const emojiOfEmotion = {
  happy: "😄",
  surprise: "😲",
  angry: "😠",
  sad: "😥",
  neutral: "😐",
};

export const mapEmotionToNumber = (prop: EmotionType) => {
  switch (prop) {
    case "neutral":
      return 0;
    case "happy":
      return 1;
    case "surprise":
      return 2;
    case "sad":
      return 3;
    case "angry":
      return 4;
    default:
      return 0;
  }
};

export const mapNumberToEmotion = (prop: number) => {
  switch (prop) {
    case 0:
      return "neutral";
    case 1:
      return "happy";
    case 2:
      return "surprise";
    case 3:
      return "sad";
    case 4:
      return "angry";
    default:
      return "neutral";
  }
};
