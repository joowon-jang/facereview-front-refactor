import {
  VideoDataType,
  VideoDetailType,
  VideoWatchedType,
  YoutubeVideoDataType,
} from "types";
import api, { youtubeApi } from "./index";

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
    const { data } = await api.post<VideoWatchedType[]>(url, props);

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
