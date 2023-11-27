import { RegisterVideoDataType } from "types/index";
import api from "./index";

export const submitNewVideo = async (props: RegisterVideoDataType) => {
  try {
    const url = "/admin/add-new-youtube-video";
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
