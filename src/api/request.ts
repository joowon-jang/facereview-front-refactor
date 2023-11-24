import api from "./index";

export const getRequestedVideoList = async () => {
  try {
    const url = "/register/recommend-list";
    const res = await api.get(url);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
