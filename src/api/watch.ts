import { VideoDetailType } from "types";
import api from "./index";

export const sendStartAnalysis = async (props: { youtube_index: number }) => {
  try {
    const url = "/watch/start-analysis";
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVideoComments = async (props: { youtube_index: number }) => {
  try {
    const url = "/watch/comment-list";
    const { data } = await api.post<VideoDetailType>(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendNewComment = async (props: {
  comment_contents: string;
  youtube_index: number;
}) => {
  try {
    const url = "/watch/watch/add-comment";
    const { data } = await api.post<VideoDetailType>(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendFinishVideo = async (props: {
  watching_data_index: number;
}) => {
  try {
    const url = "/finish-watch";
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
