import api from "./index";

export const checkEmail = async (props: { email_id: string }) => {
  try {
    const url = "/gate/email-verify";
    const res = await api.post(url, {
      email_id: props.email_id,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (props: { email_id: string; password: string }) => {
  try {
    const url = "/gate/login";
    const res = await api.post(url, props);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUp = async (props: {
  email_id: string;
  password: string;
  user_name: string;
  user_favorite_genre_1: string;
  user_favorite_genre_2: string;
  user_favorite_genre_3: string;
}) => {
  try {
    const url = "/gate/signup";
    const res = await api.post(url, props);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTempToken = async () => {
  try {
    const url = "/gate/temp-token";
    const res = await api.get(url);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const checkTutorial = async () => {
  try {
    const url = "/gate/before-tutorial";
    const res = await api.post(url);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const tutorialComplete = async () => {
  try {
    const url = "/gate/after-tutorial";
    const res = await api.post(url);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
