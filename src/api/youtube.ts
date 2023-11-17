import api from "./index";

type sendYoutubeURLs = {
  youtube_channel: string;
  youtube_comment_num: number;
  youtube_title: string;
  youtube_url: string;
};

export const getTestVideo = async () => {
  try {
    const url = "/send-youtube-urls";
    const { data } = await api.get<sendYoutubeURLs[]>(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
