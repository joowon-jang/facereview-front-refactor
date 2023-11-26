import { ReqeustedVideoType } from "types/index";
import api from "./index";

export const getRequestedVideoList = async () => {
  try {
    const url = "/register/recommend-list";
    const res = await api.get<ReqeustedVideoType[]>(url);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRequestVideoList = async (props: {
  youtube_url_id: string;
}) => {
  try {
    const url = "/register/recommend-register";
    const res = await api.post(url, props);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
