import { VideoDataType } from "types";
import api from "./index";

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
