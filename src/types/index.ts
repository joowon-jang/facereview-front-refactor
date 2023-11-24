export type EmotionType = "happy" | "surprise" | "sad" | "angry" | "neutral";
export type UserInfoType = {
  user_role: boolean;
  user_name: string;
  user_profile: number;
  user_tutorial: number;
  access_token: string;
  refresh_token: string;
};
export type VideoDataType = {
  youtube_url: string;
  youtube_title: string;
  youtube_most_emotion: EmotionType;
  youtube_most_emotion_per: number;
};
