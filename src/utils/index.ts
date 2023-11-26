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

export const getTimeToString = (time: string) => {
  const currentDate = new Date();
  const date = new Date(time + "Z");

  const timeDiff = currentDate.getTime() - date.getTime();
  const timeDiffSec = timeDiff / 1000;

  const yearDiff = new Date(timeDiff).getFullYear() - 1970;
  const monthDiff =
    currentDate.getMonth() -
    date.getMonth() +
    12 * (currentDate.getFullYear() - date.getFullYear());
  const dateDiff = Math.floor(timeDiffSec / (60 * 60 * 24));
  const hourDiff = Math.floor(timeDiffSec / (60 * 60));
  const minuteDiff = Math.floor(timeDiffSec / 60);

  if (yearDiff) {
    return yearDiff + "년 전";
  }
  if (monthDiff) {
    return monthDiff + "달 전";
  }
  if (dateDiff) {
    return dateDiff + "일 전";
  }
  if (hourDiff) {
    return hourDiff + "시간 전";
  }
  return minuteDiff + "분 전";
};
