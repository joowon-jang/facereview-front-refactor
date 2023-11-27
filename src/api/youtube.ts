import {
  VideoDataType,
  VideoDetailType,
  VideoRelatedType,
  VideoWatchedType,
  YoutubeVideoDataType,
} from "types";
import api, { youtubeApi } from "./index";

export const getSportsVideo = async () => {
  try {
    const url = "/home/sports-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGameVideo = async () => {
  try {
    const url = "/home/game-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFearVideo = async () => {
  try {
    const url = "/home/fear-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInformationVideo = async () => {
  try {
    const url = "/home/information-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVarietyShowVideo = async () => {
  try {
    const url = "/home/verietyshow-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCookVideo = async () => {
  try {
    const url = "/home/cook-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTravelVideo = async () => {
  try {
    const url = "/home/travel-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEatingVideo = async () => {
  try {
    const url = "/home/eating-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDramaVideo = async () => {
  try {
    const url = "/home/drama-list";
    const { data } = await api.get<VideoDataType[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
