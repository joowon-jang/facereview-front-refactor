import {
  DonutGraphDataType,
  EmotionType,
  VideoDataType,
  VideoDetailType,
  VideoRelatedType,
  VideoWatchedType,
  YoutubeVideoDataType,
} from "types";
import api, { youtubeApi } from "./index";

const getVideoList = async (
  category: string,
  props: { user_categorization: string }
) => {
  try {
    const url = `/home/${category}-list`;
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSportsVideo = (props: { user_categorization: string }) =>
  getVideoList("sports", props);
export const getGameVideo = (props: { user_categorization: string }) =>
  getVideoList("game", props);
export const getFearVideo = (props: { user_categorization: string }) =>
  getVideoList("fear", props);
export const getInformationVideo = (props: { user_categorization: string }) =>
  getVideoList("information", props);
export const getShowVideo = (props: { user_categorization: string }) =>
  getVideoList("show", props);
export const getCookVideo = (props: { user_categorization: string }) =>
  getVideoList("cook", props);
export const getTravelVideo = (props: { user_categorization: string }) =>
  getVideoList("travel", props);
export const getEatingVideo = (props: { user_categorization: string }) =>
  getVideoList("eating", props);
export const getDramaVideo = (props: { user_categorization: string }) =>
  getVideoList("drama", props);

export const getAllVideo = async () => {
  try {
    const url = "/home/all-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPersonalRecommendedVideo = async () => {
  try {
    const url = "/home/user-customized-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVideoDetail = async (props: { youtube_url: string }) => {
  try {
    const url = "/watch/main-youtube";
    const { data } = await api.post<VideoDetailType>(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecentVideo = async () => {
  try {
    const url = "/mypage/recent-video";
    const { data } = await api.get<VideoWatchedType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDounutGraphData = async () => {
  try {
    const url = "/mypage/donut-data";
    const { data } = await api.get<DonutGraphDataType>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllEmotionTimeData = async () => {
  try {
    const url = "/mypage/all-emotion-num";
    const { data } = await api.get<{ [key in EmotionType]: number }>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRelatedVideo = async (props: { youtube_url: string }) => {
  try {
    const url = "/watch/sub-youtube";
    const { data } = await api.post<VideoRelatedType[]>(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDataFromYoutube = async (props: { youtube_url: string }) => {
  try {
    const url = `/youtube/v3/videos?part=snippet&part=contentDetails&id=${props.youtube_url}&key=AIzaSyAva4KgvWU_2Yjcz9g7Q8csTNzHYUc1KNM`;
    const { data } = await youtubeApi.get<YoutubeVideoDataType>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
